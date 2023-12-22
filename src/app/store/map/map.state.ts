import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { MapService } from 'src/app/shared/services/map/map.service';
import { ResetMarkers } from './map.actions';
import { MarkerOfLocation } from 'src/app/shared/interfaces/map-marker';
import { FilterMapService } from '../../shared/services/filter-map/filter-map.service';

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
  constructor(
    private mapService: MapService,
    private filterMapService: FilterMapService,
    private store: Store
  ) {}

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
