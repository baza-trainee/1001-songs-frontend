import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { combineLatestWith, debounceTime, distinctUntilChanged, filter, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MultiselectComponent } from './multiselect/multiselect.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { OptionsSongFilter, SongFilter } from '../../../../../shared/interfaces/map-marker';
import { FilterMapState } from '../../../../../store/filter-map/filter-map.state';
import { mapFilter } from '../../../../../shared/enums/mapFilter';
import { FetchSongs, FindSongByTitle } from 'src/app/store/player/player.actions';
import { PlayerState } from 'src/app/store/player/player.state';
import { PlaylistSong } from 'src/app/shared/interfaces/song.interface';
import { SetSelectedValues, SetShownOptions } from '../../../../../store/filter-map/filter-map.actions';
import { TransformToMultiselectPipe } from '../../../../../shared/pipes/transform-to-multiselect.pipe';
import { FetchMarkers } from '../../../../../store/map/map.actions';

@Component({
  selector: 'app-map-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, MultiselectComponent, ReactiveFormsModule, SearchInputComponent, TransformToMultiselectPipe],
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss']
})
export class MapFilterComponent implements OnInit, OnDestroy {
  @Select(FilterMapState.getSelectedOptions) selectedOptions$!: Observable<SongFilter>;
  @Select(FilterMapState.getShowOptions) showOptions$!: Observable<OptionsSongFilter>;
  @Select(PlayerState.getSongs) songs!: Observable<PlaylistSong[]>;
  @Output() changeFilter = new EventEmitter<SongFilter>();
  filterCategory = mapFilter;
  isShowFilter = false;
  private destroy$ = new Subject<void>();

  emitCounter = 0;
  songFound = false;

  form = new FormGroup({
    country: new FormControl<string[]>([]),
    region: new FormControl<string[]>([]),
    city: new FormControl<string[]>([]),
    genre: new FormControl<string[]>([]),
    title: new FormControl<string>(''),
    fund: new FormControl<string[]>([])
  });

  autocompleteSongs: string[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((values) => {
      this.store.dispatch(new SetSelectedValues(values as SongFilter));
    });

    this.form?.valueChanges
      .pipe(
        tap((search) => {
          this.songFound = false;
          if (search.title === '') {
            this.store.dispatch(new FetchSongs(this.form.value as SongFilter));
            this.store.dispatch(new FetchMarkers(this.form.value as SongFilter));
            this.autocompleteSongs = [];
            this.emitCounter = 0;
          }
        })
      )
      .pipe(map((filter) => filter.title))
      .pipe(takeUntil(this.destroy$))
      .pipe(combineLatestWith(this.songs))
      .pipe(debounceTime(300))
      .pipe(
        distinctUntilChanged((p, c) => {
          const [pSearch, pSongs] = p;
          const [cSearch, cSongs] = c;
          return this.compareArray(cSongs, pSongs) && pSearch === cSearch;
        })
      )
      .pipe(
        filter((emits) => {
          const search = emits[0];
          if (search && search.length < 3) {
            this.autocompleteSongs = [];
            //this.emitCounter = 0;
          }
          return search && search.trim().length > 2 ? true : false;
        })
      )
      .subscribe((combinedEmits) => {
        const songs = combinedEmits[1];

        if (songs && this.emitCounter) {
          this.autocompleteSongs = songs.map((song) => song.title);
        } else {
          this.autocompleteSongs = [];
        }
        this.emitCounter = 1;
        if (this.songFound) return;
        this.store.dispatch(new FetchSongs(this.form.value as SongFilter));
        this.store.dispatch(new FetchMarkers(this.form.value as SongFilter));
      });
  }

  private compareArray(a1: PlaylistSong[], a2: PlaylistSong[]): boolean {
    let isEqual = true;
    if ((a1 === undefined && a2 !== undefined) || (a1 !== undefined && a2 === undefined)) return false;
    if (a1 === undefined && a2 === undefined) return true;
    if (a1.length !== a2.length) {
      return false;
    }
    for (const i in a1) {
      if (JSON.stringify(a1[i]) !== JSON.stringify(a2[i])) {
        isEqual = false;
      }
    }
    return isEqual;
  }

  onEnterPressed() {
    this.store.dispatch(new FetchSongs(this.form.value as SongFilter));
    this.store.dispatch(new FetchMarkers(this.form.value as SongFilter));
  }

  onFocusSearch(titleSong: string) {
    if (titleSong === '') {
      this.autocompleteSongs = [];
    }
  }

  getSelectedSong(songTitle: string) {
    this.songFound = true;
    this.store.dispatch(new FindSongByTitle(songTitle));
    const filter = new SongFilter();
    filter.title = songTitle;
    this.store.dispatch(new FetchMarkers(filter));
  }

  selectBlur() {
    this.changeFilter.emit(this.form.value as SongFilter);
    this.store.dispatch(new SetShownOptions(this.form.value as SongFilter));
    this.store.dispatch(new FetchMarkers(this.form.value as SongFilter));
  }

  searchBlur(ev: string) {
    return ev;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterSongs() {
    // this.store.dispatch(new FetchSongs(this.form.value as SongFilter));
  }

  clearFilter(event: MouseEvent) {
    const pointerEvent = event as PointerEvent;
    if (!pointerEvent.pointerType) return;
    this.form.setValue(new SongFilter());
    this.store.dispatch(new FetchSongs(new SongFilter()));
    this.store.dispatch(new FetchMarkers(this.form.value as SongFilter));
  }
}
