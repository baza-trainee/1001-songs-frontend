import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';

import {MapService} from 'src/app/shared/services/map/map.service';
import {FetchMarkers} from './map.actions';
import {Song} from 'src/app/shared/interfaces/song';
import {SetIsLoading} from '../app/app.actions';
import {Marker} from 'src/app/shared/interfaces/map-marker';

export interface MapStateModel {
  markersList: Marker[];
}

@State<MapStateModel>({
  name: 'map',
  defaults: {
    markersList: [
      {
        id: 'marker1',
        title: 'Лєтєла соя',
        genre_cycle: 'Осінь',
        found: 'no-name',
        image: './assets/img/home/kiivImg.jpg',
        location: {
          country: 'Ukraine',
          region: 'Рівне',
          district_center: 'с. Рокитне',
          recording_location: {lat: 50.4501, lng: 30.5234}
        }
      }
    ]
  }
})
@Injectable()
export class MapState {
  constructor(
    private mapService: MapService,
    private store: Store
  ) {
  }

  @Selector()
  static getMarkersList(state: MapStateModel): Marker[] {
    return state.markersList;
  }


  @Action(FetchMarkers)
  fetchMarkers(ctx: StateContext<MapStateModel>) {
    const state = ctx.getState();
    if (state.markersList.length > 1) {
      return;
    }
    this.store.dispatch(new SetIsLoading(true));
    return this.mapService.fetchMarkers().pipe(
      map((songs) => songs as Song[]), //the expression need to avoid any type
      tap((songs: Song[]) => {
        const filteredSongs = songs.filter((song: Song) => song.location != null);
        const markers = filteredSongs.map((song: Song) => this.mapService.markerFromSong(song));
        ctx.setState({
          ...state,
          markersList: [...markers]
        });
        this.store.dispatch(new SetIsLoading(false));
      })
    );
  }
}
