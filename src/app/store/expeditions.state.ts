import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FetchExpeditions } from './expedition.actions';
import Iexpediton from '../shared/interfaces/expedition.interface';
import { Injectable } from '@angular/core';
import { ExpeditionsService } from '../shared/services/expeditions/expeditions.service';
import { catchError, tap } from 'rxjs';
import { error } from 'selenium-webdriver';
//import {AddTodo, EmptyTodo} from './todo.actions';

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
  constructor(private expeditionsService: ExpeditionsService) {}

  @Selector()
  static getExpeditionsList(state: ExpeditionsStateModel): Iexpediton[] {
    return state.expeditionsList;
  }

  //   @Action(FetchExpeditions)
  //   setExpeditions({patchState, getState}: StateContext<ExpeditionsStateModel>, {expeditions}: FetchExpeditions): void {
  //     patchState({expeditionsList: [... expeditions]});
  //   }

  @Action(FetchExpeditions)
  fetchExpeditions(ctx: StateContext<ExpeditionsStateModel>, action: FetchExpeditions) {
    return this.expeditionsService.fetchExpeditions().pipe(
      tap((expeditions: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          expeditionsList: [...expeditions]
        });
      })
    );
  }

  //   @Action(EmptyTodo)
  //   emptyTodo({patchState}: StateContext<TodoStateModel>): void {
  //     patchState({todoList: []});
  //   }
}
