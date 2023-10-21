import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetIsLoading } from './app.actions';

export interface AppStateModel {
  isLoading: number;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    isLoading: 0
  }
})
@Injectable()
export class AppState {
  constructor() {}

  @Selector()
  static getIsLoading(state: AppStateModel): number {
    return state.isLoading;
  }

  @Action(SetIsLoading)
  setIsLoading(ctx: StateContext<AppStateModel>, action: SetIsLoading) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isLoading: state.isLoading + action.loadingStatus
    });
  }
}
