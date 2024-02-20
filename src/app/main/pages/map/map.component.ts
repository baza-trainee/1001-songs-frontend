import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {MarkerOfLocation, SongFilter} from 'src/app/shared/interfaces/map-marker';
import { MapState } from 'src/app/store/map/map.state';
import { PlayerComponent } from './components/player/player.component';
import { InteractiveMapComponent } from '../../../shared/shared-components/interactive-map/interactive-map.component';
import { FetchSongs, ResetSong } from 'src/app/store/player/player.actions';
import { MapFilterComponent } from './components/map-filter/map-filter.component';
import {InitFilterOptions} from "../../../store/filter-map/filter-map.actions";
import {FetchMarkers} from "../../../store/map/map.actions";

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule, InteractiveMapComponent, RouterLink, RouterLinkActive, PlayerComponent, MapFilterComponent]
})
export class MapComponent implements OnInit, OnDestroy {
  @Select(MapState.getMarkersList) markers$!: Observable<MarkerOfLocation[]>;
  private subscription: Subscription = new Subscription();
  isShowSongs = false;

  constructor(
    private store: Store,
    // private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchSongs(new SongFilter()));
    // this.http.get(`${API_URL}${StatEndpoints.map}/${StatEndpoints.filter}/${StatEndpoints.songs}`).subscribe((d) => {
    //   console.log(d);
    // });
    this.store.dispatch(new InitFilterOptions());
    this.store.dispatch(new FetchMarkers(new SongFilter()));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleMapEmit(marker: MarkerOfLocation, target: HTMLElement) {
    this.scrollToElement(target);
    this.store.dispatch(new ResetSong());
    // this.store.dispatch(ResetMarkers(marker))
  }

  scrollToElement(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
