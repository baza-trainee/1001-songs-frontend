import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { FetchScienceSongs, FetchSongById, ResetSong, ResetSongs, SelectNext, SelectPrev, SelectSong } from './es-player.actions';
import { EducationService } from 'src/app/shared/services/education/education.service';
import { EducationSong } from 'src/app/shared/interfaces/science-song.interface';

export interface ESPlayerStateModel {
  songsList: EducationSong[];
  selecteSong: EducationSong;
}

@State<ESPlayerStateModel>({
  name: 'esplaylist',
  defaults: {
    songsList: [],
    selecteSong: {} as EducationSong
  }
})
@Injectable()
export class ESPlayerState {
  constructor(
    private educationService: EducationService,
    private store: Store
  ) {}

  @Selector()
  static getSongs(state: ESPlayerStateModel): EducationSong[] {
    return state.songsList;
  }

  @Selector()
  static getSelectedSong(state: ESPlayerStateModel): EducationSong {
    return state.selecteSong;
  }

  @Action(FetchSongById)
  fetchSongById(ctx: StateContext<ESPlayerStateModel>, action: FetchSongById) {
    const state = ctx.getState();
    return this.educationService.fetchSongById(action.id).pipe(
      tap((data) => {
        ctx.setState({
          ...state,
          selecteSong: data as EducationSong
        });
      })
    );
  }

  @Action(FetchScienceSongs)
  fetchScienceSongs(ctx: StateContext<ESPlayerStateModel>, action: FetchScienceSongs) {
    const state = ctx.getState();
    return this.educationService.fetchSongsByGenreId(action.genre).pipe(
      tap((scienceSongs) => {
        const s = scienceSongs as { items: [] };
        ctx.setState({
          ...state,
          songsList: s.items as EducationSong[]
        });
      })
    );
  }

  @Action(SelectNext)
  selectNext(ctx: StateContext<ESPlayerStateModel>) {
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
  selectPrev(ctx: StateContext<ESPlayerStateModel>) {
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
  selectSong(ctx: StateContext<ESPlayerStateModel>, action: SelectSong) {
    const state = ctx.getState();
    const selectedSong = state.songsList.find((song: EducationSong) => song.id + '' === action.selectedSongId);
    if (!selectedSong) {
      return;
    }
    return ctx.setState({
      ...state,
      selecteSong: selectedSong
    });
  }

  @Action(ResetSong)
  resetSong(ctx: StateContext<ESPlayerStateModel>) {
    const state = ctx.getState();

    return ctx.setState({
      ...state,
      selecteSong: {} as EducationSong
    });
  }

  @Action(ResetSongs)
  resetSongs(ctx: StateContext<ESPlayerStateModel>) {
    const state = ctx.getState();

    return ctx.setState({
      ...state,
      songsList: []
    });
  }
}
