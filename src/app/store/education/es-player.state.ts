import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { FetchScienceSongs, FetchSongById, ResetSong, SelectNext, SelectPrev, SelectSong } from './es-player.actions';
import { EducationService } from 'src/app/shared/services/education/education.service';
import { ScienceSong } from 'src/app/shared/interfaces/science-song.interface';

export interface ESPlayerStateModel {
  songsList: ScienceSong[];
  selecteSong: ScienceSong;
}

@State<ESPlayerStateModel>({
  name: 'esplaylist',
  defaults: {
    songsList: [],
    selecteSong: {} as ScienceSong
  }
})
@Injectable()
export class ESPlayerState {
  constructor(
    private educationService: EducationService,
    private store: Store
  ) {}

  @Selector()
  static getSongs(state: ESPlayerStateModel): ScienceSong[] {
    return state.songsList;
  }

  @Selector()
  static getSelectedSong(state: ESPlayerStateModel): ScienceSong {
    return state.selecteSong;
  }

  @Action(FetchSongById)
  fetchSongById(ctx: StateContext<ESPlayerStateModel>, action: FetchSongById) {
    const state = ctx.getState();
    return this.educationService.fetchSongById(action.id).pipe(
      tap(data =>{
        ctx.setState({
          ...state,
          selecteSong: data as ScienceSong
        })
      })
    );
  }

  @Action(FetchScienceSongs)
  fetchScienceSongs(ctx: StateContext<ESPlayerStateModel>, action: FetchScienceSongs) {
    const state = ctx.getState();
    return this.educationService.fetchSongsByGenre(action.genre).pipe(
      tap((scienceSongs) => {
        ctx.setState({
          ...state,
          songsList: scienceSongs as ScienceSong[]
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
    const selectedSong = state.songsList.find((song: ScienceSong) => song.id === action.selectedSongId);
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
      selecteSong: {} as ScienceSong
    });
  }
}
