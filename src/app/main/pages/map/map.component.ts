import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {RouterLink, RouterLinkActive} from "@angular/router";

import {Marker, SelectedSongFilter} from 'src/app/shared/interfaces/map-marker';
import {FetchMarkers} from 'src/app/store/map/map.actions';
import {MapState} from 'src/app/store/map/map.state';
import {PlayerComponent} from "./player/player.component";
import {InteractiveMapComponent} from "../../../shared/shared-components/interactive-map/interactive-map.component";
import {MapFilterComponent} from "./map-filter/map-filter.component";
import {cordsMarkers} from "../../../mock-data/markers";

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule, InteractiveMapComponent, RouterLink, RouterLinkActive, PlayerComponent, MapFilterComponent]
})
export class MapComponent implements OnInit {
  @Select(MapState.getMarkersList) markers$?: Observable<Marker[]>;
  testMarker: Marker[] = cordsMarkers;
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchMarkers());
  }

  handleMapEmit(ev: Marker) {
    console.log('event value : ', ev);
  }

  onSelectedOptionsChange(options: SelectedSongFilter) {
    console.log(options)
  }
}
