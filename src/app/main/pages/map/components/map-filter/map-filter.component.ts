import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { filter, Observable, Subject } from 'rxjs';
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

  localSongs: { title: string; id: number }[] = [];

  form = new FormGroup({
    country: new FormControl<string[]>([]),
    region: new FormControl<string[]>([]),
    city: new FormControl<string[]>([]),
    genre: new FormControl<string[]>([]),
    title: new FormControl<string>(''),
    fund: new FormControl<string[]>([])
  });

  autocompleteSongs: { title: string; id: number }[] = [];
  previousValue: SongFilter = { ...(this.form.value as SongFilter) };

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new InitFilterOptions());

    

    this.form
      .get('title')
      ?.valueChanges.pipe(
        filter((query: string | null) => {
          if (query && query.length <= 3) {
            this.autocompleteSongs = [];
          }
          return query ? query.length >= 3 : false;
        })
      )

      .subscribe(() => {
        this.songs.pipe().subscribe((songs) => {
          this.autocompleteSongs = songs.map((song) => ({ title: song.title, id: song.id }));
        });
        this.store.dispatch(new FetchSongs(this.form.value as SongFilter))
      });
  }

  getSelectedSong(event: { title: string; id: number }) {
    this.autocompleteSongs = [];
    this.store.dispatch(new FindSongById(event.id));
    const filter = new SongFilter();
    filter.title = event.title;
    this.store.dispatch(new FetchMarkers(filter));
  }

  selectBlur() {
    this.form.get('title')?.setValue('');
    this.autocompleteSongs = [];
    this.changeFilter.emit(this.form.value as SongFilter);
    this.store.dispatch(new SetShownOptions(this.form.value as SongFilter));
    this.store.dispatch(new FetchMarkers(this.form.value as SongFilter));
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
    this.store.dispatch(new FetchMarkers(this.form.value as SongFilter));
  }
}
