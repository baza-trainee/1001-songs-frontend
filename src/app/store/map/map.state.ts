import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { MapService } from 'src/app/shared/services/map/map.service';
import { FetchMarkers, FilteredMarkers, ResetMarkers } from './map.actions';
import { Song } from 'src/app/shared/interfaces/song.interface';
import { SetIsLoading } from '../app/app.actions';
import { Marker } from 'src/app/shared/interfaces/map-marker';
import { FilterMapService } from '../../shared/services/filter-map/filter-map.service';

export interface MapStateModel {
  markersList: Marker[];
  filteredMarkerList: Marker[];
}

@State<MapStateModel>({
  name: 'map',
  defaults: {
    markersList: [],
    filteredMarkerList: []
  }
})
@Injectable()
export class MapState {
  constructor(
    private mapService: MapService,
    private filterMapService: FilterMapService,
    private store: Store
  ) {}

  @Selector()
  static getMarkersList(state: MapStateModel): Marker[] {
    return state.markersList;
  }
  @Selector()
  static getFilteredMarkerList(state: MapStateModel): Marker[] {
    return state.filteredMarkerList;
  }

  @Action(FilteredMarkers)
  filteredMarkers(ctx: StateContext<MapStateModel>, action: FilteredMarkers) {
    const state = ctx.getState();

    const markers = this.filterMapService.filterMarkers(action.options);
    ctx.setState({
      ...state,
      filteredMarkerList: markers
    });
  }

  @Action(ResetMarkers)
  resetMarkers(ctx: StateContext<MapStateModel>) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      filteredMarkerList: state.markersList
    });
  }

  @Action(FetchMarkers)
  fetchMarkers(ctx: StateContext<MapStateModel>) {
    const state = ctx.getState();
    if (state.markersList.length > 1) {
      return;
    }
    this.store.dispatch(new SetIsLoading(1));
    return this.mapService.fetchMarkers().pipe(
      map((songs) => songs as Song[]), //the expression need to avoid any type
      tap((songs: Song[]) => {
        const filteredSongs = songs.filter((song: Song) => song.location != null);
        const markers = filteredSongs.map((song: Song) => this.mapService.markerFromSong(song));
        ctx.setState({
          ...state,
          markersList: [...markers],
          filteredMarkerList: [...markers]
        });
        this.store.dispatch(new SetIsLoading(-1));
      })
    );
  }
}
