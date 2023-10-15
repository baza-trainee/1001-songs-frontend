import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

export class MapFilterComponent implements OnInit{
  @Input() markers!: Marker[];
  @Output() selectedOptionsChange = new EventEmitter<SelectedSongFilter>();
  filterCategory = mapFilter;
  selectedOptions: SelectedSongFilter = new SelectedSongFilter();
  isShowFilter = false;
  form = new FormGroup({
    country: new FormControl([]),
    region: new FormControl([]),
    settlement: new FormControl([]),
    genre: new FormControl([]),
    title: new FormControl([]),
    found: new FormControl([])
  });

  constructor(private _translate: TranslateService, private _mapService: MapService) {}

  initHandlers (): void {
    this.form.controls.country.valueChanges.subscribe(()=> {

    })
  }

  sendSelectedOptions() {
    this.selectedOptionsChange.emit(this.selectedOptions);
  }

  filerClear() {
    this.selectedOptions = new SelectedSongFilter();
    this.sendSelectedOptions();
  }

  ngOnInit(): void {
    this.initHandlers();
    this.selectedOptions = this._mapService.createFilterBySongs(this.markers);
    console.log(this.selectedOptions)
  }
}
