import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Marker } from 'src/app/shared/interfaces/map-marker';
import { InteraciveMapComponent } from 'src/app/shared/shared-components/interacive-map/interacive-map.component';
import { FetchMarkers } from 'src/app/store/map/map.actions';
import { MapState } from 'src/app/store/map/map.state';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule, InteraciveMapComponent]
})
export class MapComponent implements OnInit {
  @Select(MapState.getMarkersList) markers$?: Observable<Marker[]>;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(new FetchMarkers());
  }

  handleMapEmit(ev: Marker) {
    console.log('event value : ', ev);
  }
}
