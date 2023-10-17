import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Marker, SelectedSongFilter} from "../../../../shared/interfaces/map-marker";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MultiselectComponent} from "./multiselect/multiselect.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
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
  @Output() selectedOptionsChange = new EventEmitter<SelectedSongFilter>();
  filterCategory = mapFilter;
  options: SelectedSongFilter = new SelectedSongFilter();
  isShowFilter = false;

  form = new FormGroup({
    country: new FormControl(['']),
    region: new FormControl([]),
    settlement: new FormControl([]),
    genre: new FormControl([]),
    title: new FormControl([]),
    found: new FormControl([])
  });

  constructor(
    private _translate: TranslateService,
    private _mapService: MapService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['markers'] && changes['markers'].currentValue !== changes['markers'].previousValue) {
      this.options = this._mapService.createFilterBySongs(this.markers);
    }
  }

  sendSelectedOptions() {
    this.selectedOptionsChange.emit(this.options);
  }

  filerClear() {
    console.log(this.form.get('country')?.value)
    this.form.reset();
    this.options = this._mapService.createFilterBySongs(this.markers);
    this.sendSelectedOptions();
  }
}
