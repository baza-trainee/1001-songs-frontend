import {Action, Selector, State, StateContext} from '@ngxs/store';
import { SetExpeditions } from './expedition.actions';
import Iexpediton from '../shared/interfaces/expedition.interface';
import { Injectable } from '@angular/core';
//import {AddTodo, EmptyTodo} from './todo.actions';

export interface ExpeditionsStateModel {
  expeditionsList: Iexpediton[];
}

// @Injectable({
//     providedIn: 'root'
//   })

@State<ExpeditionsStateModel>({
  name: 'expeditions',
  defaults: {
    expeditionsList: [ {
        id: '1',
        name: 'Благовіщеня',
        shortDescription: 'Зустріч Весни на Благовіщеня на Поліссі',
        mediaSrc: 'https://youtu.be/EDU2xd_bRvM',
        eventDate: '7 квітня 2006 року',
        location: 'Село Осівка, Житомирщина'
      }],
  }
})


export class ExpeditionsState {

  @Selector()
  static getExpeditionsList(state: ExpeditionsStateModel): Iexpediton[] {
    return state.expeditionsList;
  }

  @Action(SetExpeditions)
  setExpeditions({patchState, getState}: StateContext<ExpeditionsStateModel>, {expeditions}: SetExpeditions): void {
    patchState({expeditionsList: [... expeditions]});
  }

//   @Action(EmptyTodo)
//   emptyTodo({patchState}: StateContext<TodoStateModel>): void {
//     patchState({todoList: []});
//   }
}