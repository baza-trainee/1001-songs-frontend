import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Marker } from 'src/app/shared/interfaces/map-marker';
import { FetchMarkers } from 'src/app/store/map/map.actions';
import { MapState } from 'src/app/store/map/map.state';
import { PlayerComponent } from './player/player.component';
import { InteractiveMapComponent } from '../../../shared/shared-components/interactive-map/interactive-map.component';
import { MapFilterComponent } from './map-filter/map-filter.component';
import { FetchSongsByLocation, ResetSong } from 'src/app/store/player/player.actions';

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule, InteractiveMapComponent, RouterLink, RouterLinkActive, PlayerComponent, MapFilterComponent]
})
export class MapComponent implements OnInit, OnDestroy {
  @Select(MapState.getMarkersList) markers$!: Observable<Marker[]>;
  @Select(MapState.getFilteredMarkerList) filteredMarkers$!: Observable<Marker[]>;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchMarkers());
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleMapEmit(marker: Marker, target: HTMLElement) {
    this.scrollToElement(target);
    this.store.dispatch(new ResetSong());
    this.store.dispatch(new FetchSongsByLocation(marker.location.district_center));
  }

  scrollToElement(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
