import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';

import {FilteredOptions, FilterSong} from 'src/app/shared/interfaces/map-marker';
import {InteractiveMapComponent} from 'src/app/shared/shared-components/interactive-map/interactive-map.component';
import {FetchMarkers} from 'src/app/store/map/map.actions';
import {MapState} from 'src/app/store/map/map.state';
import {MapFilterComponent} from "./map-filter/map-filter.component";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [CommonModule, InteractiveMapComponent, MapFilterComponent]
})

export class MapComponent implements OnInit, OnDestroy {
  @Select(MapState.getFilterSongs) markers$?: Observable<FilterSong[]>;
  private subscription: Subscription = new Subscription();
  allMarkers: FilterSong[] = [];
  filteredMarkers: FilterSong[] = [];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchMarkers());
    if (this.markers$) {
      this.markers$.subscribe((data) => {
        this.allMarkers = data.map((song) => song);
        this.filteredMarkers = [...this.allMarkers];
      });
    }
  }

  onSelectedOptionsChange(options: FilteredOptions) {
    console.log(options + 'main-component')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  handleMapEmit(ev: FilterSong) {
    console.log('event value : ', ev);
  }
}
