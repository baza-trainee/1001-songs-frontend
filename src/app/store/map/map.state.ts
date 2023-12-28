import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { ResetMarkers } from './map.actions';
import { MarkerOfLocation } from 'src/app/shared/interfaces/map-marker';

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
  constructor() {}

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
}
