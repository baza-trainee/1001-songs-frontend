import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, merge, Observable, Subject, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Marker, SelectedMarkerFilter } from '../../../../shared/interfaces/map-marker';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { mapFilter } from '../../../../shared/enums/mapFilter';
import { LoadFilteredMarkers, UpdateSelectOptions, UpdateShowOptions } from '../../../../store/filter-map/filter-map.actions';
import { FilterMapState } from '../../../../store/filter-map/filter-map.state';
import { FilteredMarkers } from '../../../../store/map/map.actions';

@Component({
  selector: 'app-map-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, MultiselectComponent, ReactiveFormsModule],
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss']
})
export class MapFilterComponent implements OnChanges, OnInit, OnDestroy {
  @Input() markers!: Marker[];
  @Select(FilterMapState.getSelectedOptions) selectedOptions$!: Observable<SelectedMarkerFilter>;
  @Select(FilterMapState.getShowOptions) showOptions$!: Observable<SelectedMarkerFilter>;
  filterCategory = mapFilter;
  isShowFilter = false;
  private destroy$ = new Subject<void>();

  form = new FormGroup({
    country: new FormControl<string[]>([]),
    region: new FormControl<string[]>([]),
    settlement: new FormControl<string[]>([]),
    genre: new FormControl<string[]>([]),
    title: new FormControl<string[]>([]),
    found: new FormControl<string[]>([])
  });

  constructor(
    private translate: TranslateService,
    private store: Store
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['markers'] && changes['markers'].currentValue !== changes['markers'].previousValue) {
      this.store.dispatch(new LoadFilteredMarkers(this.markers));
    }
  }

  ngOnInit(): void {
    merge(
      this.form.controls.country.valueChanges.pipe(map(() => 'country')),
      this.form.controls.region.valueChanges.pipe(map(() => 'region')),
      this.form.controls.settlement.valueChanges.pipe(map(() => 'settlement')),
      this.form.controls.genre.valueChanges.pipe(map(() => 'genre')),
      this.form.controls.title.valueChanges.pipe(map(() => 'title')),
      this.form.controls.found.valueChanges.pipe(map(() => 'found'))
    )
      .pipe(
        takeUntil(this.destroy$),
        map((key) => key as keyof SelectedMarkerFilter)
      )
      .subscribe((value: keyof SelectedMarkerFilter) => {
        this.store.dispatch(new UpdateSelectOptions(this.form.value as SelectedMarkerFilter));
        this.store.dispatch(new UpdateShowOptions(value, this.markers));
        this.store.dispatch(new FilteredMarkers(this.form.value as SelectedMarkerFilter));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filerClear() {
    this.form.setValue(new SelectedMarkerFilter());
    this.store.dispatch(new UpdateSelectOptions(this.form.value as SelectedMarkerFilter));
    this.store.dispatch(new LoadFilteredMarkers(this.markers));
  }

  onSubmit() {}
}
