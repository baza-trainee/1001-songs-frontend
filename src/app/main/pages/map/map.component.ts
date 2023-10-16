import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Marker } from 'src/app/shared/interfaces/map-marker';
import { InteraciveMapComponent } from 'src/app/shared/shared-components/interacive-map/interacive-map.component';
import { FetchMarkers } from 'src/app/store/map/map.actions';
import { MapState } from 'src/app/store/map/map.state';
import { PlayerComponent } from './player/player.component';
import { FetchSongsByLocation } from 'src/app/store/player/player.actions';

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule, InteraciveMapComponent, RouterLink, RouterLinkActive, PlayerComponent]
})
export class MapComponent implements OnInit {
  @Select(MapState.getMarkersList) markers$?: Observable<Marker[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchMarkers());
  }

  handleMapEmit(ev: Marker) {
    this.store.dispatch(new FetchSongsByLocation(ev.popup.title));
  }
}
