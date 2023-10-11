import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MultiselectComponent} from "./multiselect/multiselect.component";
import {FilteredOptions, FilterSong, SelectedOptions} from "../../../../shared/interfaces/map-marker";
import {MapService} from "../../../../shared/services/map/map.service";


@Component({
  selector: 'app-map-filter',
  standalone: true,
  imports: [CommonModule, MultiselectComponent],
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss']
})

export class MapFilterComponent implements OnInit, OnChanges {
  @Input() markers!: FilterSong[];
  @Output() selectedOptionsChange = new EventEmitter<FilteredOptions>();
  showFilter = false;
  options!: SelectedOptions;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.options = this.mapService.getAllProperty(this.markers);
  }
  ngOnChanges(changes: SimpleChanges) {
    if ('markers' in changes) {
      this.options = this.mapService.getAllProperty(this.markers);
    }
  }

  onSelectedOptionsChange(options: FilteredOptions) {
    console.log(options)
  }
}
