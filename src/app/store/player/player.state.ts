import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { Song } from 'src/app/shared/interfaces/song';
import { SetIsLoading } from '../app/app.actions';
import { CloudService } from 'src/app/shared/services/audio/cloud.service';
import { FetchSongsByLocation, ResettSong, SelectNext, SelectPrev, SelectSong } from './player.actions';

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

  @Action(SelectSong)
  resetSong(ctx: StateContext<PlayerStateModel>) {
    const state = ctx.getState();

    return ctx.setState({
      ...state,
      selecteSong: {} as Song
    });
  }

  @Action(FetchSongsByLocation)
  fetchSongsByLocation(ctx: StateContext<PlayerStateModel>, action: FetchSongsByLocation) {
    const state = ctx.getState();
    this.store.dispatch(new SetIsLoading(1));
    return this.cloudService.getSongsByLocation(action.locationName).pipe(
      tap((songs: Song[]) => {
        ctx.setState({
          ...state,
          songsList: [...songs]
        });
        this.store.dispatch(new SetIsLoading(-1));
      })
    );
  }
}
