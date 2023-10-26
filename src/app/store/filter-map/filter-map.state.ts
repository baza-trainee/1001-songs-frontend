import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { SongFilter } from '../../shared/interfaces/map-marker';
import { LoadFilteredMarkers, UpdateSelectOptions, UpdateShowOptions } from './filter-map.actions';
import { FilterMapService } from '../../shared/services/filter-map/filter-map.service';

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
    allOptions: new SongFilter()
  }
})
@Injectable()
export class FilterMapState {
  constructor(
    private filterMapService: FilterMapService,
    private store: Store
  ) {}

  @Selector()
  static getSelectedOptions(state: FilterMapStateModel): SongFilter {
    return state.selectedOptions;
  }

  @Selector()
  static getShowOptions(state: FilterMapStateModel): SongFilter {
    return state.showOptions;
  }

  @Action(UpdateSelectOptions)
  updateSelectOptions(ctx: StateContext<FilterMapStateModel>, action: UpdateSelectOptions) {
    const state = ctx.getState();

    ctx.setState({
      ...state,
      selectedOptions: action.selectedOptions
    });
  }

  @Action(UpdateShowOptions)
  updateShowOptions(ctx: StateContext<FilterMapStateModel>, action: UpdateShowOptions) {
    const state = ctx.getState();
    const options = state.showOptions;
    const nameOption = action.nameOption;
    const markers = action.markers;
    const selectOptions = state.selectedOptions;

    let filterMarkers = this.filterMapService.filterMarker(selectOptions, markers);

    const showOptions = { ...this.filterMapService.createFilterByMarker(filterMarkers), [nameOption]: options[nameOption] };

    ctx.setState({
      ...state,
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
