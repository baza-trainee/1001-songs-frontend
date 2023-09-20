import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MapService } from 'src/app/shared/services/map/map.service';
import { FetchMarkers } from './map.actions';
import { tap } from 'rxjs';
import { Song } from 'src/app/shared/interfaces/song';

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
  fetchMarkers(ctx: StateContext<MapStateModel>) {
    return this.mapService.fetchMarkers().pipe(
      // map((markersData) => expeditionData ), //the expression need to avoid any type
      tap((songs: any) => {
        const filteredSongs = songs.filter((song: Song) => song.location != null);
        const state = ctx.getState();
        const markers = filteredSongs.map((song: Song, i: number) => this.mapService.markerFromSong(song, i));
        ctx.setState({
          ...state,
          markersList: [...markers]
        });
      })
    );
  }
}
