import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, Subject, filter, map, pairwise, startWith, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MultiselectComponent } from './multiselect/multiselect.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { MarkerOfLocation, SongFilter } from '../../../../../shared/interfaces/map-marker';
import { FilterMapState } from '../../../../../store/filter-map/filter-map.state';
import { mapFilter } from '../../../../../shared/enums/mapFilter';
import { InitFilterOptions, SetShownOptions } from '../../../../../store/filter-map/filter-map.actions';
import { FetchSongs } from 'src/app/store/player/player.actions';
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
  // @Input() markers!: MarkerOfLocation[];
  @Select(FilterMapState.getSelectedOptions) selectedOptions$!: Observable<SongFilter>;
  @Select(FilterMapState.getShowOptions) showOptions$!: Observable<SongFilter>;
  @Select(PlayerState.getSongs) songs!: Observable<Song[]>;
  @Output() changeFilter = new EventEmitter<MarkerOfLocation[]>();
  filterCategory = mapFilter;
  isShowFilter = false;
  private destroy$ = new Subject<void>();

  form = new FormGroup({
    country: new FormControl<string[]>([]),
    region: new FormControl<string[]>([]),
    city: new FormControl<string[]>([]),
    genre: new FormControl<string[]>([]),
    title: new FormControl<string>(''),
    found: new FormControl<string[]>([])
  });

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

    this.form.valueChanges.pipe(
      takeUntil(this.destroy$),
      startWith(this.form.getRawValue()),
      pairwise(),
      map(([previous, current]) => {
        //  console.log('previous ::: ', previous);
        //  console.log('current ::: ', current);
        const changedControl = Object.keys(current).find((key) => current[key as keyof SongFilter] !== previous[key as keyof SongFilter]);
       // console.log(changedControl)
         return changedControl as keyof SongFilter;
      }),
      
      filter((key) => key !== null && key !== undefined),
      //filter((key) => key === 'country')
    )
    .subscribe((value: keyof SongFilter) => {
   // console.log("filter is updated ");
    // this.store.dispatch(new FetchSongs(this.form.value as SongFilter));
    // this.store.dispatch(new FilteredMarkers(this.form.value as SongFilter));
    // this.store.dispatch(new UpdateOptions(this.form.value as SongFilter, value));
     });
  }

  selectBlur(){
    this.store.dispatch(new FetchSongs(this.form.value as SongFilter));
     console.log("blur")
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterSongs() {
    console.log(this.form.value);
    this.store.dispatch(new FetchSongs(this.form.value as SongFilter));
  }

  clearFilter() {
    this.form.setValue(new SongFilter());
    this.store.dispatch(new FetchSongs(new SongFilter()));
  }
}
