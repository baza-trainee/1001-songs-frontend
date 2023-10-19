import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {Marker, SelectedMarkerFilter} from "../../../../shared/interfaces/map-marker";
import {MultiselectComponent} from "./multiselect/multiselect.component";
import {mapFilter} from "../../../../shared/enums/mapFilter";
import {MapService} from "../../../../shared/services/map/map.service";

@Component({
  selector: 'app-map-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, MultiselectComponent, ReactiveFormsModule],
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss']
})

export class MapFilterComponent implements OnChanges {
  @Input() markers!: Marker[];
  @Output() selectedOptionsChange = new EventEmitter<SelectedMarkerFilter>();

  filterCategory = mapFilter;
  options: SelectedMarkerFilter = new SelectedMarkerFilter();
  isShowFilter = false;

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
    private mapService: MapService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['markers'] && changes['markers'].currentValue !== changes['markers'].previousValue) {
      this.options = this.mapService.createFilterByMarker(this.markers);
    }
  }

  sendSelectedOptions() {
    this.selectedOptionsChange.emit(this.options);
  }

  filerClear() {
    this.form.reset();
    this.options = this.mapService.createFilterByMarker(this.markers);
    this.sendSelectedOptions();
  }
}
