import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import {OptionsSongFilter, SelectedOptionsSongFilter, SongFilter} from '../../shared/interfaces/map-marker';
import {InitFilterOptions, SetSelectedValues, SetShownOptions} from './filter-map.actions';
import { FilterMapService } from '../../shared/services/filter-map/filter-map.service';
import { MapService } from 'src/app/shared/services/map/map.service';

export interface FilterMapStateModel {
  idSelected: SelectedOptionsSongFilter;
  selectedOptions: OptionsSongFilter;
  showOptions: OptionsSongFilter;
  allOptions: OptionsSongFilter;
  selectedValues: SongFilter;
}

@State<FilterMapStateModel>({
  name: 'filterMap',
  defaults: {
    idSelected: {} as SelectedOptionsSongFilter,
    selectedOptions: {} as OptionsSongFilter,
    showOptions: {} as OptionsSongFilter,
    allOptions: {} as OptionsSongFilter,
    selectedValues: new SongFilter()
  }
})

@Injectable()
export class FilterMapState {
  constructor(
    private filterMapService: FilterMapService,
    private mapService: MapService
  ) {}

  @Selector()
  static getSelectedOptions(state: FilterMapStateModel): OptionsSongFilter {
    return state.selectedOptions;
  }

  @Selector()
  static getShowOptions(state: FilterMapStateModel): OptionsSongFilter {
    return state.showOptions;
  }

  @Selector()
  static getSelectedValues(state: FilterMapStateModel): SongFilter {
    return state.selectedValues;
  }
  
  @Selector()
  static getAllOptions(state: FilterMapStateModel): OptionsSongFilter {
    return state.allOptions;
  }

  @Action(SetSelectedValues)
  setSelectedValues(ctx: StateContext<FilterMapStateModel>, action: SetSelectedValues) {
    const state = ctx.getState();

   // this.filterMapService.setOptions(action.formValue).subscribe(response => {
      ctx.setState({
        ...state,
        selectedValues: action.formValue
      });
   // })
  }
  
  @Action(SetShownOptions)
  setShownOptions(ctx: StateContext<FilterMapStateModel>, action: SetShownOptions) {
    const state = ctx.getState();

    this.filterMapService.setOptions(action.formValue).subscribe(response => {
      ctx.setState({
        ...state,
        showOptions: response
      });
    })
  }

  @Action(InitFilterOptions)
  InitFilterOptions(ctx: StateContext<FilterMapStateModel>) {
    const state = ctx.getState();

    this.filterMapService.setOptions().subscribe((response: OptionsSongFilter) => {
      ctx.setState({
        ...state,
        showOptions: response,
        allOptions: response
      });
    });
  }
}

