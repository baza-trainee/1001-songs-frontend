import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import {FetchMarkers, ResetMarkers} from './map.actions';
import { MarkerOfLocation } from 'src/app/shared/interfaces/map-marker';
import {MapService} from "../../shared/services/map/map.service";

export interface MapStateModel {
  markersList: MarkerOfLocation[];
  filteredMarkerList: MarkerOfLocation[];
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
  constructor(private mapService: MapService) {}

  @Selector()
  static getMarkersList(state: MapStateModel): MarkerOfLocation[] {
    return state.markersList;
  }
  @Selector()
  static getFilteredMarkerList(state: MapStateModel): MarkerOfLocation[] {
    return state.filteredMarkerList;
  }

  @Action(ResetMarkers)
  resetMarkers(ctx: StateContext<MapStateModel>, action: ResetMarkers) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      markersList: action.markers
    });
  }

  @Action(FetchMarkers)
  fetchMarkers(ctx: StateContext<MapStateModel>, action: FetchMarkers) {
    const state = ctx.getState();
    this.mapService.fetchMarker(action.options).subscribe((response) => {
      ctx.setState({
        ...state,
        markersList: response
      });
    })
  }
}
