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
    country: new FormControl<string[]>([]),
    region: new FormControl<string[]>([]),
    settlement: new FormControl<string[]>([]),
    genre: new FormControl<string[]>([]),
    title: new FormControl<string[]>([]),
    found: new FormControl<string[]>([])
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

  // handleChipRemoved(option: string): void {
  //   this.sendSelectedOptions();
  // }


  sendSelectedOptions() {
    this.selectedOptionsChange.emit(this.options);
  }

  filerClear() {
    this.form.reset();
    this.options = this._mapService.createFilterBySongs(this.markers);
    this.sendSelectedOptions();
  }
}
