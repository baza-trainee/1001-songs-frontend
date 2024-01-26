import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { Song } from 'src/app/shared/interfaces/song.interface';
import { FetchScienceSongs, FetchSongs, ResetSong, SelectNext, SelectPrev, SelectSong } from './es-player.actions';
import { FilterMapService } from 'src/app/shared/services/filter-map/filter-map.service';
import { MarkerOfLocation } from 'src/app/shared/interfaces/map-marker';
import { ResetMarkers } from '../map/map.actions';
import { MapService } from 'src/app/shared/services/map/map.service';
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
   // private filterMapService: FilterMapService,
    private mapService: MapService,
    private store: Store
  ) {}

  @Selector()
  static getSongs(state: ESPlayerStateModel): ScienceSong[] {
    return state.songsList;
  }

  @Selector()
  static getSelectedSong(state: ESPlayerStateModel): ScienceSong {
    return state.selecteSong ;
  }

//   @Action(FetchSongs)
//   fetchSongs(ctx: StateContext<ESPlayerStateModel>, action: FetchSongs) {
//     const state = ctx.getState();

//     return this.filterMapService.fetchSongsByFilter(action.filter).pipe(
//       tap((response: object) => {
//         console.log('SONGS : Main response', response);
//         const modifiedResponse = Object.values(response);
//         const newSongs: Song[] = modifiedResponse[0].list_songs;
//         const newMarkers: MarkerOfLocation[] = modifiedResponse[1].list_markers.map(
//           (marker: { location__city_ua: string; location__coordinates: string; count: number }) => this.mapService.modifyMarker(marker)
//         );
//         this.store.dispatch(new ResetMarkers(newMarkers));
//         ctx.setState({
//           ...state,
//           songsList: newSongs
//         });
//       })
//     );
//   }

  @Action(FetchScienceSongs)
  fetchScienceSongs(ctx: StateContext<ESPlayerStateModel>, action: FetchScienceSongs) {
    const state = ctx.getState();
    console.log('Fetch science songs', action.genre)
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
      console.log(selectedSong)
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
