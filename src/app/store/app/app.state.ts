import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MapService } from 'src/app/shared/services/map/map.service';
import { tap } from 'rxjs';
import { Song } from 'src/app/shared/interfaces/song';
import { SetIsLoading } from './app.actions';

export interface AppStateModel {
  isLoading: boolean;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    isLoading: false
  }
})
@Injectable()
export class AppState {
  constructor() {}

  @Selector()
  static getIsLoading(state: AppStateModel): boolean {
    return state.isLoading;
  }

  @Action(SetIsLoading)
  setIsLoading(ctx: StateContext<AppStateModel>, action: SetIsLoading) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isLoading: action.loadingStatus
    });
  }
}
