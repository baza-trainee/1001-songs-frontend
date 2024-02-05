import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, Subject, filter } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MultiselectComponent } from './multiselect/multiselect.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { MarkerOfLocation, SongFilter } from '../../../../../shared/interfaces/map-marker';
import { FilterMapState } from '../../../../../store/filter-map/filter-map.state';
import { mapFilter } from '../../../../../shared/enums/mapFilter';
import { InitFilterOptions, SetShownOptions } from '../../../../../store/filter-map/filter-map.actions';
import { FetchSongById, FetchSongs } from 'src/app/store/player/player.actions';
import { PlayerState } from 'src/app/store/player/player.state';
import { Song } from 'src/app/shared/interfaces/song.interface';

@Component({
  selector: 'app-map-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, MultiselectComponent, ReactiveFormsModule, SearchInputComponent],
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss']
})
export class MapFilterComponent implements OnInit, OnDestroy {
  @Select(FilterMapState.getSelectedOptions) selectedOptions$!: Observable<SongFilter>;
  @Select(FilterMapState.getShowOptions) showOptions$!: Observable<SongFilter>;
  @Select(PlayerState.getSongs) songs!: Observable<Song[]>;
  @Output() changeFilter = new EventEmitter<MarkerOfLocation[]>();
  filterCategory = mapFilter;
  isShowFilter = false;
  private destroy$ = new Subject<void>();

  localSongs: { title: string; id: string }[] = [];

  form = new FormGroup({
    country: new FormControl<string[]>([]),
    region: new FormControl<string[]>([]),
    city: new FormControl<string[]>([]),
    genre: new FormControl<string[]>([]),
    title: new FormControl<string>(''),
    found: new FormControl<string[]>([])
  });

  titles: { title: string; id: string }[] = [];

  constructor(
    private store: Store,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this._translate.onLangChange.subscribe(() => {
      this.songs.subscribe((songs) => {
        this.store.dispatch(new SetShownOptions(songs));
      });
    });

    this.store.dispatch(new InitFilterOptions()).subscribe(() => {
      this.songs.subscribe((songs) => {
        this.store.dispatch(new SetShownOptions(songs));
      });
    });

    this.songs.subscribe((songs) => {
      this.localSongs = songs.map((song) => ({ title: song.title, id: song.id }));
    });

    this.form
      .get('title')
      ?.valueChanges.pipe(
        filter((query: string | null) => {
          if (query && query.length <= 3) {
            this.titles = [];
          }
          return query ? query.length >= 3 : false;
        })
      )

      .subscribe((searchQuery) => {
        const query = (searchQuery + '').trim().toLowerCase();
        const filteredTitles = this.localSongs.filter((song) => song.title.toLowerCase().includes(query));
        this.titles = filteredTitles;
      });

    // this.form.valueChanges.pipe(
    //   takeUntil(this.destroy$),
    //   startWith(this.form.getRawValue()),
    //   pairwise(),
    //   map(([previous, current]) => {
    //     const changedControl = Object.keys(current).find((key) => current[key as keyof SongFilter] !== previous[key as keyof SongFilter]);
    //      return changedControl as keyof SongFilter;
    //   }),
    //   filter((key) => key !== null && key !== undefined),
    // )
    // .subscribe((value: keyof SongFilter) => {
    // // this.store.dispatch(new FetchSongs(this.form.value as SongFilter));
    // // this.store.dispatch(new FilteredMarkers(this.form.value as SongFilter));
    // // this.store.dispatch(new UpdateOptions(this.form.value as SongFilter, value));
    //  });
  }

  getSelectedSong(event: { title: string; id: string }) {
    this.store.dispatch(new FetchSongById(event.id));
  }

  selectBlur() {
    this.store.dispatch(new FetchSongs(this.form.value as SongFilter));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterSongs() {
    this.store.dispatch(new FetchSongs(this.form.value as SongFilter));
  }

  clearFilter() {
    this.form.setValue(new SongFilter());
    this.store.dispatch(new FetchSongs(new SongFilter()));
  }
}
