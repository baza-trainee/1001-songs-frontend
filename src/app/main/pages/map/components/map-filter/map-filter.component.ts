import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { filter, map, Observable, pairwise, startWith, Subject, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MultiselectComponent } from './multiselect/multiselect.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { Marker, MarkerOfLocation, SongFilter } from '../../../../../shared/interfaces/map-marker';
import { FilterMapState } from '../../../../../store/filter-map/filter-map.state';
import { mapFilter } from '../../../../../shared/enums/mapFilter';
import { LoadFilteredMarkers, UpdateOptions } from '../../../../../store/filter-map/filter-map.actions';
import { FilteredMarkers, ResetMarkers } from '../../../../../store/map/map.actions';

@Component({
  selector: 'app-map-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, MultiselectComponent, ReactiveFormsModule, SearchInputComponent],
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss']
})
export class MapFilterComponent implements OnChanges, OnInit, OnDestroy {
  // @Input() markers!: MarkerOfLocation[];
  @Select(FilterMapState.getSelectedOptions) selectedOptions$!: Observable<SongFilter>;
  @Select(FilterMapState.getShowOptions) showOptions$!: Observable<SongFilter>;
  @Output() changeFilter = new EventEmitter<MarkerOfLocation[]>();
  filterCategory = mapFilter;
  isShowFilter = false;
  private destroy$ = new Subject<void>();

  form = new FormGroup({
    country: new FormControl<string[]>([]),
    region: new FormControl<string[]>([]),
    settlement: new FormControl<string[]>([]),
    genre: new FormControl<string[]>([]),
    title: new FormControl<string>(''),
    found: new FormControl<string[]>([])
  });

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['markers'] && changes['markers'].currentValue !== changes['markers'].previousValue) {
    //   this.store.dispatch(new LoadFilteredMarkers(this.markers));
    // }
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.form.getRawValue()),
        pairwise(),
        map(([previous, current]) => {
          const changedControl = Object.keys(current).find((key) => current[key as keyof SongFilter] !== previous[key as keyof SongFilter]);
          return changedControl as keyof SongFilter;
        }),
        filter((key) => key !== null && key !== undefined)
      )
      .subscribe((value: keyof SongFilter) => {
        //this.store.dispatch(new FilteredMarkers(this.form.value as SongFilter));
        this.store.dispatch(new UpdateOptions(this.form.value as SongFilter, value ));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filerClear() {
    this.form.setValue(new SongFilter());
   // this.store.dispatch(new LoadFilteredMarkers(this.markers));
    this.store.dispatch(new ResetMarkers());
  }

  onSubmit() {}
}
