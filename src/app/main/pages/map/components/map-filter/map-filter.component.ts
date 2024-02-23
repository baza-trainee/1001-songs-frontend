import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, filter, Observable, skip, Subject, Subscription, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MultiselectComponent } from './multiselect/multiselect.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { OptionsSongFilter, SongFilter } from '../../../../../shared/interfaces/map-marker';
import { FilterMapState } from '../../../../../store/filter-map/filter-map.state';
import { mapFilter } from '../../../../../shared/enums/mapFilter';
import { FetchSongs, FindSongById } from 'src/app/store/player/player.actions';
import { PlayerState } from 'src/app/store/player/player.state';
import { Song } from 'src/app/shared/interfaces/song.interface';
import { InitFilterOptions, SetShownOptions } from '../../../../../store/filter-map/filter-map.actions';
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
  @Select(PlayerState.getSongs) songs!: Observable<Song[]>;
  @Output() changeFilter = new EventEmitter<SongFilter>();
  filterCategory = mapFilter;
  isShowFilter = false;
  private destroy$ = new Subject<void>();

  localSongs: string[] = [];

  form = new FormGroup({
    country: new FormControl<string[]>([]),
    region: new FormControl<string[]>([]),
    city: new FormControl<string[]>([]),
    genre: new FormControl<string[]>([]),
    title: new FormControl<string>(''),
    fund: new FormControl<string[]>([])
  });

  autocompleteSongs: string[] = [];
  previousValue: SongFilter = { ...(this.form.value as SongFilter) };

  songSub$!: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new InitFilterOptions());

    this.form
      .get('title')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(500))
      .pipe(
        filter((query: string | null) => {
          if (query && query.length <= 3) {
            this.autocompleteSongs = [];
          }
          return query ? query.length >= 3 : false;
        })
      )
      .pipe(debounceTime(500))
      .subscribe(() => {
        console.log('search input emmits')
        this.songSub$ = this.songs.pipe(skip(1)).subscribe((songs) => {
          if (!songs) {
            this.autocompleteSongs = [];
            return;
          }
          this.autocompleteSongs = songs.map((song) => song.title);
        });
        this.store.dispatch(new FetchSongs(this.form.value as SongFilter));
        // this.songSub$.unsubscribe()
      });
  }

  onFocusSearch(titleSong: string) {
    this.autocompleteSongs = [];
    return titleSong;
  }

  getSelectedSong(songTitle: string) {
    this.songSub$.unsubscribe();
    this.autocompleteSongs = [];
    this.store.dispatch(new FindSongById(songTitle));
    const filter = new SongFilter();
    this.store.dispatch(new FetchMarkers(filter));
  }

  selectBlur() {
    this.autocompleteSongs = [];
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
    this.store.dispatch(new FetchSongs(this.form.value as SongFilter));
  }

  clearFilter() {
    this.songSub$.unsubscribe();
    this.form.setValue(new SongFilter());
    this.store.dispatch(new FetchSongs(new SongFilter()));
    this.store.dispatch(new FetchMarkers(this.form.value as SongFilter));
  }
}
