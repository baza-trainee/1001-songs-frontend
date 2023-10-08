import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { Song } from 'src/app/shared/interfaces/song';
import { SetIsLoading } from '../app/app.actions';
//import { FetchSongs } from './player.actions';
import { IAudioData } from 'src/app/shared/interfaces/audio-data.interface';
import { CloudService } from 'src/app/shared/services/audio/cloud.service';
import { FetchSongsByLocation, SelectNext, SelectPrev, SelectSong } from './playlist.actions';
// import { PlayerService } from 'src/app/shared/services/audio/player.service';
// import { songs } from 'src/app/mock-data/songs';

export interface PlaylistStateModel {
  songsList: Song[];
  playingSong: Song;
}

@State<PlaylistStateModel>({
  name: 'playlist',
  defaults: {
    songsList: [],
    playingSong: {} as Song
  }
})
@Injectable()
export class PlaylistState {
  constructor(
    private cloudService: CloudService,
    //private Service: PlayerService,
    private store: Store
  ) {}

  @Selector()
  static getSongs(state: PlaylistStateModel): Song[] {
    return state.songsList;
  }

  @Selector()
  static getSelectedSong(state: PlaylistStateModel): Song {
    return state.playingSong as Song;
  }

  @Action(SelectNext)
  selectNext(ctx: StateContext<PlaylistStateModel>) {
    const state = ctx.getState();
    const currentSong = state.playingSong;
    const nextSongIndex = state.songsList.indexOf(state.playingSong) + 1;
    const songsListLength = state.songsList.length;
    if (nextSongIndex === 0 || nextSongIndex === songsListLength) {
      return;
    }
    return ctx.setState({
      ...state,
      playingSong: state.songsList[nextSongIndex]
    });
  }

  @Action(SelectPrev)
  selectPrev(ctx: StateContext<PlaylistStateModel>) {
    const state = ctx.getState();
    const currentSong = state.playingSong;
    const nextSongIndex = state.songsList.indexOf(state.playingSong) - 1;
    const songsListLength = state.songsList.length;
    if (nextSongIndex < 0) {
      return;
    }
    return ctx.setState({
      ...state,
      playingSong: state.songsList[nextSongIndex]
    });
  }

  @Action(SelectSong)
  selectSong(ctx: StateContext<PlaylistStateModel>, action: SelectSong) {
    console.log('step 2', action);
    const state = ctx.getState();
    const selectedSong = state.songsList.find((song: Song) => song.id === action.selectedSongId);
    if (!selectedSong) {
      return;
    }
    return ctx.setState({
      ...state,
      playingSong: selectedSong
    });
  }

  @Action(FetchSongsByLocation)
  fetchSongsByLocation(ctx: StateContext<PlaylistStateModel>, action: FetchSongsByLocation) {
    console.log(action);
    const state = ctx.getState();
    this.store.dispatch(new SetIsLoading(true));
    return this.cloudService.getSongsByLocation(action.locationName).pipe(
      tap((songs: Song[]) => {
        ctx.setState({
          ...state,
          songsList: [...songs]
        });
        this.store.dispatch(new SetIsLoading(false));
      })
    );
  }
}
