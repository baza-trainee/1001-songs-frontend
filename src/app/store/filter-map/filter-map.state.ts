import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { SongFilter } from '../../shared/interfaces/map-marker';
import { LoadFilteredMarkers, UpdateOptions } from './filter-map.actions';
import { FilterMapService } from '../../shared/services/filter-map/filter-map.service';
import * as options from 'src/app/static-data/filter-options';

export interface FilterMapStateModel {
  selectedOptions: SongFilter;
  showOptions: SongFilter;
  allOptions: SongFilter;
}

@State<FilterMapStateModel>({
  name: 'filterMap',
  defaults: {
    selectedOptions: new SongFilter(),
    showOptions: new SongFilter(),
    allOptions: {
      country: options.coruntries,
      region: options.regions,
      settlement: ['Ромейки'],
      title: 'Kalyna',
      genre: options.genres,
      found: ['fond of nina Matvienko']
    }
  }
})
@Injectable()
export class FilterMapState {
  constructor(private filterMapService: FilterMapService) {}

  @Selector()
  static getSelectedOptions(state: FilterMapStateModel): SongFilter {
    return state.selectedOptions;
  }

  @Selector()
  static getShowOptions(state: FilterMapStateModel): SongFilter {
    return state.showOptions;
  }

  @Selector()
  static getAllOptions(state: FilterMapStateModel): SongFilter {
    return state.allOptions;
  }

  @Action(UpdateOptions)
  updateOptions(ctx: StateContext<FilterMapStateModel>, action: UpdateOptions) {
    const state = ctx.getState();
    const filterMarkers = this.filterMapService.filterMarkers(action.selectedOptions);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const optionsWithLength = Object.entries(action.selectedOptions).filter(([key, value]) => value.length > 0);
    let onSelect: keyof SongFilter | undefined;

    if (optionsWithLength.length === 1) {
      onSelect = optionsWithLength[0][0] as keyof SongFilter;
    }

    const showOptions = this.filterMapService.generateShowOptions(
      //filterMarkers,
      action.selectedOptions,
      state.allOptions,
      state.showOptions,
      action.optionName,
      onSelect
    );

    ctx.setState({
      ...state,
      selectedOptions: action.selectedOptions,
      showOptions
    });
  }

  @Action(LoadFilteredMarkers)
  loadFilteredMarkers(ctx: StateContext<FilterMapStateModel>, action: LoadFilteredMarkers) {
    const state = ctx.getState();

    const allOptions = this.filterMapService.createFilterByMarker(action.markers);
    ctx.setState({
      ...state,
      allOptions,
      showOptions: allOptions
    });
  }
}
