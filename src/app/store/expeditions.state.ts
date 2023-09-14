import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FetchExpeditions } from './expedition.actions';
import Iexpediton from '../shared/interfaces/expedition.interface';
import { Injectable } from '@angular/core';
import { ExpeditionsService } from '../shared/services/expeditions/expeditions.service';
import { map, tap } from 'rxjs';

export interface ExpeditionsStateModel {
  expeditionsList: Iexpediton[];
}

@State<ExpeditionsStateModel>({
  name: 'expeditions',
  defaults: {
    expeditionsList: [{} as Iexpediton]
  }
})
@Injectable()
export class ExpeditionsState {
  constructor(private expeditionsService: ExpeditionsService) {}

  @Selector()
  static getExpeditionsList(state: ExpeditionsStateModel): Iexpediton[] {
    return state.expeditionsList;
  }

  @Action(FetchExpeditions)
  fetchExpeditions(ctx: StateContext<ExpeditionsStateModel>) {
    return this.expeditionsService.fetchExpeditions().pipe(
      map((expeditionData) => expeditionData as Iexpediton[]),
      tap((expeditions: Iexpediton[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          expeditionsList: [...expeditions]
        });
      })
    );
  }
}
