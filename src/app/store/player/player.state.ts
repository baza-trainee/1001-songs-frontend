import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { PlaylistSong, Song } from 'src/app/shared/interfaces/song.interface';
import { FetchSongById, FetchSongs, FindSongByTitle, ResetSong, SelectNext, SelectPrev, SelectSong } from './player.actions';
import { FilterMapService } from 'src/app/shared/services/filter-map/filter-map.service';
import { MapService } from 'src/app/shared/services/map/map.service';
import { PlayerService } from 'src/app/shared/services/player/player.service';

export interface PlayerStateModel {
  songsList: Song[];
  selecteSong: PlaylistSong;
  songs: PlaylistSong[];
}

@State<PlayerStateModel>({
  name: 'playlist',
  defaults: {
    songsList: [],
    selecteSong: {} as PlaylistSong,
    songs: []
  }
})
@Injectable()
export class PlayerState {
  constructor(
    private filterMapService: FilterMapService,
    private mapService: MapService,
    private store: Store,
    private playerService: PlayerService
  ) {}

  @Selector()
  static getSongs(state: PlayerStateModel): PlaylistSong[] {
    return state.songs;
  }

  @Selector()
  static getSelectedSong(state: PlayerStateModel): PlaylistSong {
    return state.selecteSong as PlaylistSong;
  }

  @Action(FindSongByTitle)
  findSongByTitle(ctx: StateContext<PlayerStateModel>, action: FindSongByTitle) {
    const state = ctx.getState();
    const selectedSong = state.songs.find((song: PlaylistSong) => song.title === action.songTitle);
    if (!selectedSong) {
      return;
    }
    return ctx.setState({
      ...state,
      songs: [selectedSong]
    });
  }

  @Action(FetchSongById)
  fetchSongById(ctx: StateContext<PlayerStateModel>, action: FetchSongById) {
    const state = ctx.getState();

    return this.filterMapService.fetchSongById(action.id).pipe(
      tap((foudedSong: unknown) => {
        const song = foudedSong as Song;
        ctx.setState({
          ...state,
          songsList: [song as Song]
        });
      })
    );
  }

  @Action(FetchSongs)
  fetchSongs(ctx: StateContext<PlayerStateModel>, action: FetchSongs) {
    const state = ctx.getState();
    return this.filterMapService.fetchSongsByFilter(action.filter).pipe(
      tap((response: object) => {
        const data = response as { items: PlaylistSong[] };
        if (!data.items) {
          ctx.setState({
            ...state,
            songs: [{} as PlaylistSong]
          });
        }
        ctx.setState({
          ...state,
          songs: data.items
        });
      })
    );
  }

  @Action(SelectNext)
  selectNext(ctx: StateContext<PlayerStateModel>) {
    const state = ctx.getState();
    const nextSongIndex = state.songs.indexOf(state.selecteSong) + 1;
    const songsListLength = state.songs.length;
    if (nextSongIndex === 0 || nextSongIndex === songsListLength) {
      return;
    }
    return ctx.setState({
      ...state,
      selecteSong: state.songs[nextSongIndex]
    });
  }

  @Action(SelectPrev)
  selectPrev(ctx: StateContext<PlayerStateModel>) {
    const state = ctx.getState();
    const nextSongIndex = state.songs.indexOf(state.selecteSong) - 1;
    if (nextSongIndex < 0) {
      return;
    }
    return ctx.setState({
      ...state,
      selecteSong: state.songs[nextSongIndex]
    });
  }

  @Action(SelectSong)
  selectSong(ctx: StateContext<PlayerStateModel>, action: SelectSong) {
    const state = ctx.getState();
    const selectedSong = state.songs.find((song: PlaylistSong) => song.id === action.selectedSongId);

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
      selecteSong: {} as PlaylistSong
    });
  }
}
