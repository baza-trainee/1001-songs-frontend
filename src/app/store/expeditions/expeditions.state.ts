import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

import { SetIsLoading } from '../app/app.actions';
import { ExpeditionsService } from '../../shared/services/expeditions/expeditions.service';
import {FetchExpeditions, SetSelectedExpedition} from './expedition.actions';
import Iexpediton, {ArticleExpedition} from '../../shared/interfaces/expedition.interface';

export interface ExpeditionsStateModel {
  expeditionsList: Iexpediton[];
  selectedExpedition: ArticleExpedition;
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
    ],
    selectedExpedition: {} as ArticleExpedition
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
  @Selector()
  static getSelectedExpedition(state: ExpeditionsStateModel): ArticleExpedition {
    return state.selectedExpedition;
  }

  @Action(SetSelectedExpedition)
  setSelectedExpedition(ctx: StateContext<ExpeditionsStateModel>, action: SetSelectedExpedition) {
    const state = ctx.getState();
    const selectedExpedition = state.expeditionsList.find((expedition: Iexpediton) => expedition.id === action.id);
    if (!selectedExpedition) {
      return;
    }
    return ctx.setState({
      ...state,
      selectedExpedition: this.expeditionsService.createArticle(selectedExpedition)
    });
  }

  @Action(FetchExpeditions)
  fetchExpeditions(ctx: StateContext<ExpeditionsStateModel>) {
    this.store.dispatch(new SetIsLoading(1));
    return this.expeditionsService.fetchExpeditions().pipe(
      map((expeditionData) => expeditionData as Iexpediton[]), //the expression need to avoid any type
      tap((expeditions: Iexpediton[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          expeditionsList: [...expeditions]
        });
        this.store.dispatch(new SetIsLoading(-1));
      })
    );
  }
}
