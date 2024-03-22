import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MarkerOfLocation, SongFilter } from 'src/app/shared/interfaces/map-marker';
import { MapState } from 'src/app/store/map/map.state';
import { PlayerComponent } from './components/player/player.component';
import { InteractiveMapComponent } from '../../../shared/shared-components/interactive-map/interactive-map.component';
import { FetchSongs, ResetSong } from 'src/app/store/player/player.actions';
import { MapFilterComponent } from './components/map-filter/map-filter.component';
import { InitFilterOptions } from '../../../store/filter-map/filter-map.actions';
import { FetchMarkers } from '../../../store/map/map.actions';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule, InteractiveMapComponent, RouterLink, RouterLinkActive, PlayerComponent, MapFilterComponent]
})
export class MapComponent implements OnInit, OnDestroy {
  @Select(MapState.getMarkersList) markers$!: Observable<MarkerOfLocation[]>;
  isShowSongs = true;

  constructor(
    private store: Store,
    private meta: Meta
  ) {
    this.meta.updateTag({
      name: 'title',
      content: 'Мапа архаїчної музики: Традиції української музичної спадщини'
    }),
      this.meta.updateTag({
        name: 'description',
        content:
          'Знайдіть на музичній мапі українські народні пісні і фольклористів-дослідників вашої місцевості, допоможіть зберегти архіви і зробити їх публічними'
      });
  }

  ngOnInit(): void {
    this.store.dispatch(new InitFilterOptions());
    if (history.state) {
      const filter = history.state.filter as SongFilter;
      if (filter && filter.city) {
        this.store.dispatch(new FetchMarkers(filter));
        this.store.dispatch(new FetchSongs(filter));
      } else {
        this.store.dispatch(new FetchMarkers(new SongFilter()));
        this.store.dispatch(new FetchSongs(new SongFilter()));
      }
    }
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.store.dispatch(new ResetSong());
  }

  // onFilterChange(filter: SongFilter) {
  //   // this.store.dispatch(new FetchSongs(filter));
  //   return filter;
  // }

  handleMapEmit(marker: MarkerOfLocation, target: HTMLElement) {
    const filter = new SongFilter([marker.id + '']);
    this.scrollToElement(target);
    this.store.dispatch(new FetchMarkers(filter));
    this.store.dispatch(new FetchSongs(filter));
  }

  scrollToElement(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
