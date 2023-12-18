import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { SongFilter } from '../../shared/interfaces/map-marker';
import { FilterSongs, InitFilterOptions, LoadFilteredMarkers, UpdateOptions } from './filter-map.actions';
import { FilterMapService } from '../../shared/services/filter-map/filter-map.service';
import * as options from 'src/app/static-data/filter-options';
import { MapService } from 'src/app/shared/services/map/map.service';
import { map, tap } from 'rxjs';

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
    private mapService: MapService
  ) {}

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
    // console.log('action', action);
    const state = ctx.getState();
    // const filterMarkers = this.filterMapService.filterMarkers(action.selectedOptions);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const optionsWithLength = Object.entries(action.selectedOptions).filter(([key, value]) => value.length > 0);
    //console.log(optionsWithLength);
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

  @Action(FilterSongs)
  filterSongs(ctx: StateContext<FilterMapStateModel>, action: FilterSongs) {
    const state = ctx.getState();
   console.log(action);
   // const allOptions = this.filterMapService.createFilterByMarker(action.markers);
   const x = action.filter;
   this.filterMapService.fetchSongsByFilter(action.filter);
    ctx.setState({
      ...state,
      // allOptions,
      // showOptions: allOptions
    });
  }

  @Action(InitFilterOptions)
  InitFilterOptions(ctx: StateContext<FilterMapStateModel>) {
    const state = ctx.getState();

    return this.mapService.fetchMarkers().pipe(
      tap((response: any) => {
        let allOptions = {
          country: options.coruntries,
          region: options.regions,
          city: response[1],
          title: '',
          genre: options.genres,
          found: response[2]
        };
        console.log(response);

        ctx.setState({
          ...state,
          allOptions: allOptions,
          showOptions: allOptions
        });
      })
    );
  }
}
