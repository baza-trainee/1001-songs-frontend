import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Marker, MarkerOfLocation, SongFilter } from 'src/app/shared/interfaces/map-marker';
import { FetchMarkers } from 'src/app/store/map/map.actions';
import { MapState } from 'src/app/store/map/map.state';
import { PlayerComponent } from './components/player/player.component';
import { InteractiveMapComponent } from '../../../shared/shared-components/interactive-map/interactive-map.component';
import { FetchSongs, ResetSong } from 'src/app/store/player/player.actions';
import { MapFilterComponent } from './components/map-filter/map-filter.component';

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule, InteractiveMapComponent, RouterLink, RouterLinkActive, PlayerComponent, MapFilterComponent]
})
export class MapComponent implements OnInit, OnDestroy {
  @Select(MapState.getMarkersList) markers$!: Observable<MarkerOfLocation[]>;
  @Select(MapState.getFilteredMarkerList) filteredMarkers$!: Observable<Marker[]>;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
   // this.store.dispatch(new FetchMarkers());
    this.store.dispatch(new FetchSongs(new SongFilter()));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleMapEmit(marker: MarkerOfLocation, target: HTMLElement) {
    this.scrollToElement(target);
    this.store.dispatch(new ResetSong());
    let params: SongFilter = new SongFilter();
    params.city = [marker.location__city_ua];
    this.store.dispatch(new FetchSongs(params));
  }

  scrollToElement(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
