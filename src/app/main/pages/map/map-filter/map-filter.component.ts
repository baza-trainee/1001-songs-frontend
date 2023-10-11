import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MultiselectComponent} from "./multiselect/multiselect.component";
import {FilterSong, SelectedOptions} from "../../../../shared/interfaces/map-marker";
import {MapService} from "../../../../shared/services/map/map.service";


@Component({
  selector: 'app-map-filter',
  standalone: true,
  imports: [CommonModule, MultiselectComponent],
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss']
})

export class MapFilterComponent implements OnChanges {
  @Input() markers!: FilterSong[];
  @Output() selectedOptionsChange = new EventEmitter<SelectedOptions>();
  showFilter = false;
  options!: SelectedOptions;
  selectedOptions: SelectedOptions = {
    country: [],
    region: [],
    district_center: [],
    title: [],
    genre_cycle: [],
    found: []
  };
  constructor(private mapService: MapService) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['markers'] && changes['markers'].currentValue !== changes['markers'].previousValue) {
      this.options = this.mapService.createFilterBySongs(this.markers);
    }
  }

  sendSelectedOptions() {
    this.selectedOptionsChange.emit(this.selectedOptions);
  }

  onSelectedOptionsChange(filterType: keyof SelectedOptions, selectedOptions: string[]) {
    this.selectedOptions[filterType] = selectedOptions;
    this.sendSelectedOptions();
  }

  filerClear() {
    this.selectedOptions = {
      country: [],
      region: [],
      district_center: [],
      title: [],
      genre_cycle: [],
      found: []
    };
    this.sendSelectedOptions();
  }
}
