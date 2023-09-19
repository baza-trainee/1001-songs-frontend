import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MapService } from 'src/app/shared/services/map/map.service';
import { FetchMarkers } from './map.actions';
import { tap } from 'rxjs';
// import { FetchExpeditions } from './expedition.actions';
// import Iexpediton from '../shared/interfaces/expedition.interface';
// import { Injectable } from '@angular/core';
// import { ExpeditionsService } from '../shared/services/expeditions/expeditions.service';
// import { map, tap } from 'rxjs';

export interface MapStateModel {
  markersList: any[];
}

@State<MapStateModel>({
  name: 'map',
  defaults: {
    markersList: [
      {
        key: 'marker1',
        position: { lat: 50.4501, lng: 30.5234 },
        popup: {
          title: 'с. Крячківка, Полтавська обл.',
          photoUrl: './assets/img/home/kiivImg.jpg',
          countRecords: 20,
          link: '#'
        }
      }
    ]
  }
})
@Injectable()
export class MapState {
  constructor(private mapService: MapService) {}

  @Selector()
  static getMarkersList(state: MapStateModel): any[] {
    return state.markersList;
  }

  @Action(FetchMarkers)
  fetchExpeditions(ctx: StateContext<MapStateModel>) {
    return this.mapService.fetchMarkers().pipe(
      // map((markersData) => expeditionData ), //the expression need to avoid any type
      tap((expeditions: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          markersList: [...expeditions]
        });
      })
    );
  }
}
