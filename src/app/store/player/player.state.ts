import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { Song } from 'src/app/shared/interfaces/song.interface';
import { SetIsLoading } from '../app/app.actions';
import { CloudService } from 'src/app/shared/services/audio/cloud.service';
import { FetchSongById, FetchSongs, ResetSong, SelectNext, SelectPrev, SelectSong } from './player.actions';
import { FilterMapService } from 'src/app/shared/services/filter-map/filter-map.service';
import { MarkerOfLocation } from 'src/app/shared/interfaces/map-marker';
import { ResetMarkers } from '../map/map.actions';
import { MapService } from 'src/app/shared/services/map/map.service';

export interface PlayerStateModel {
  songsList: Song[];
  selecteSong: Song;
}

@State<PlayerStateModel>({
  name: 'playlist',
  defaults: {
    songsList: [],
    selecteSong: {} as Song
  }
})
@Injectable()
export class PlayerState {
  constructor(
    private cloudService: CloudService,
    private filterMapService: FilterMapService,
    private mapService: MapService,
    private store: Store
  ) {}

  @Selector()
  static getSongs(state: PlayerStateModel): Song[] {
    return state.songsList;
  }

  @Selector()
  static getSelectedSong(state: PlayerStateModel): Song {
    return state.selecteSong as Song;
  }

  @Action(FetchSongs)
  fetchSongs(ctx: StateContext<PlayerStateModel>, action: FetchSongs) {
    const state = ctx.getState();

    return this.filterMapService.fetchSongsByFilter(action.filter).pipe(
      tap((response: any) => {
        console.log('SONGS : Main response', response);
        const newSongs: Song[] = response[0].list_songs;
        const newMarkers: MarkerOfLocation[] = response[1].list_markers.map(
          (marker: { location__city_ua: string; location__coordinates: string; count: number }) => this.mapService.modifyMarker(marker)
        );
        this.store.dispatch(new ResetMarkers(newMarkers));
        ctx.setState({
          ...state,
          songsList: newSongs
        });
      })
    );
  }

  @Action(SelectNext)
  selectNext(ctx: StateContext<PlayerStateModel>) {
    const state = ctx.getState();
    const nextSongIndex = state.songsList.indexOf(state.selecteSong) + 1;
    const songsListLength = state.songsList.length;
    if (nextSongIndex === 0 || nextSongIndex === songsListLength) {
      return;
    }
    return ctx.setState({
      ...state,
      selecteSong: state.songsList[nextSongIndex]
    });
  }

  @Action(SelectPrev)
  selectPrev(ctx: StateContext<PlayerStateModel>) {
    const state = ctx.getState();
    const nextSongIndex = state.songsList.indexOf(state.selecteSong) - 1;
    if (nextSongIndex < 0) {
      return;
    }
    return ctx.setState({
      ...state,
      selecteSong: state.songsList[nextSongIndex]
    });
  }

  @Action(SelectSong)
  selectSong(ctx: StateContext<PlayerStateModel>, action: SelectSong) {
    const state = ctx.getState();
    const selectedSong = state.songsList.find((song: Song) => song.id === action.selectedSongId);
    if (!selectedSong) {
      return;
    }
    return ctx.setState({
      ...state,
      selecteSong: selectedSong
    });
  }

  @Action(ResetSong)
  resetSong(ctx: StateContext<PlayerStateModel>) {
    const state = ctx.getState();

    return ctx.setState({
      ...state,
      selecteSong: {} as Song
    });
  }

  @Action(FetchSongById)
  fetchSongById(ctx: StateContext<PlayerStateModel>, action: FetchSongById) {
    const state = ctx.getState();
    this.store.dispatch(new SetIsLoading(1));
    return this.cloudService.getSongById(action.id).pipe(
      tap((song: Song) => {
        ctx.setState({
          ...state,
          selecteSong: song
        });
        this.store.dispatch(new SetIsLoading(-1));
      })
    );
  }
}
