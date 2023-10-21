import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {RouterLink, RouterLinkActive} from "@angular/router";

import {Marker, SelectedMarkerFilter} from 'src/app/shared/interfaces/map-marker';
import {FetchMarkers} from 'src/app/store/map/map.actions';
import {MapState} from 'src/app/store/map/map.state';
import {PlayerComponent} from "./player/player.component";
import {InteractiveMapComponent} from "../../../shared/shared-components/interactive-map/interactive-map.component";
import {MapFilterComponent} from "./map-filter/map-filter.component";

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule, InteractiveMapComponent, RouterLink, RouterLinkActive, PlayerComponent, MapFilterComponent]
})
export class MapComponent implements OnInit, OnDestroy {
  @Select(MapState.getMarkersList) markers$!: Observable<Marker[]>;
  filteredMarkers!: Marker[];
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchMarkers());
    this.subscription = this.markers$.subscribe((marker)=>{
      this.filteredMarkers = marker;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  handleMapEmit(ev: Marker) {
    console.log('event value : ', ev);
  }

  onSelectedOptionsChange(options: SelectedMarkerFilter) {
    console.log(options)
  }
}
