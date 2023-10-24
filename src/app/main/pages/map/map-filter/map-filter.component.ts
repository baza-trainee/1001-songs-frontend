import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {Marker, SelectedMarkerFilter} from "../../../../shared/interfaces/map-marker";
import {MultiselectComponent} from "./multiselect/multiselect.component";
import {mapFilter} from "../../../../shared/enums/mapFilter";
import {Subscription} from "rxjs";
import {FilterMapService} from "../../../../shared/services/filter-map/filter-map.service";

@Component({
  selector: 'app-map-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, MultiselectComponent, ReactiveFormsModule],
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss']
})

export class MapFilterComponent implements OnChanges, OnInit, OnDestroy {
  @Input() markers!: Marker[];
  @Output() selectedOptionsChange = new EventEmitter<SelectedMarkerFilter>();

  filterCategory = mapFilter;
  options: SelectedMarkerFilter = new SelectedMarkerFilter();
  isShowFilter = false;
  private formSubscription!: Subscription[];

  form = new FormGroup({
    country: new FormControl<string[]>([]),
    region: new FormControl<string[]>([]),
    settlement: new FormControl<string[]>([]),
    genre: new FormControl<string[]>([]),
    title: new FormControl<string[]>([]),
    found: new FormControl<string[]>([])
  });

  constructor (
    private translate: TranslateService,
    private filterMapService: FilterMapService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['markers'] && changes['markers'].currentValue !== changes['markers'].previousValue) {
      this.options = this.filterMapService.createFilterByMarker(this.markers);
    }
  }

  sendSelectedOptions() {
    this.selectedOptionsChange.emit(this.options);
  }

  filerClear() {
    this.form.reset();
    this.options = this.filterMapService.createFilterByMarker(this.markers);
    this.sendSelectedOptions();
  }

  onSubmit() {
  }


  ngOnInit() {
    this.formSubscription.push(this.form.controls.country.valueChanges.subscribe((value) => {
      console.log(value);
    }));
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.forEach(subs => {
        subs.unsubscribe()
      })
    }
  }
}
