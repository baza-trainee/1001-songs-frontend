import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { FetchExpeditions } from './expedition.actions';
import Iexpediton from '../shared/interfaces/expedition.interface';
import { Injectable } from '@angular/core';
import { ExpeditionsService } from '../shared/services/expeditions/expeditions.service';
import { map, tap } from 'rxjs';
import { SetIsLoading } from './app/app.actions';

export interface ExpeditionsStateModel {
  expeditionsList: Iexpediton[];
}

@State<ExpeditionsStateModel>({
  name: 'expeditions',
  defaults: {
    expeditionsList: [
      {
        id: '1',
        name: 'Благовіщеня',
        shortDescription: 'Зустріч Весни на Благовіщеня на Поліссі',
        mediaSrc: 'https://youtu.be/EDU2xd_bRvM',
        eventDate: '7 квітня 2006 року',
        location: 'Село Осівка, Житомирщина'
      }
    ]
  }
})
@Injectable()
export class ExpeditionsState {
  constructor(
    private expeditionsService: ExpeditionsService,
    private store: Store
  ) {}

  @Selector()
  static getExpeditionsList(state: ExpeditionsStateModel): Iexpediton[] {
    return state.expeditionsList;
  }

  @Action(FetchExpeditions)
  fetchExpeditions(ctx: StateContext<ExpeditionsStateModel>) {
    this.store.dispatch(new SetIsLoading(true));
    return this.expeditionsService.fetchExpeditions().pipe(
      map((expeditionData) => expeditionData as Iexpediton[]), //the expression need to avoid any type
      tap((expeditions: Iexpediton[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          expeditionsList: [...expeditions]
        });
        this.store.dispatch(new SetIsLoading(false));
      })
    );
  }
}
