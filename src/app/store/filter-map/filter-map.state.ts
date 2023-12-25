import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { SongFilter } from '../../shared/interfaces/map-marker';
import { FilterSongs, InitFilterOptions, SetShownOptions, UpdateOptions } from './filter-map.actions';
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
    const state = ctx.getState();

    const optionsWithLength = Object.entries(action.selectedOptions).filter(([key, value]) => value.length > 0);
    let onSelect: keyof SongFilter | undefined;

    if (optionsWithLength.length === 1) {
      onSelect = optionsWithLength[0][0] as keyof SongFilter;
    }

    ctx.setState({
      ...state,
      selectedOptions: action.selectedOptions
    });
  }

  @Action(SetShownOptions)
  setShownOptions(ctx: StateContext<FilterMapStateModel>, action: SetShownOptions) {
    const state = ctx.getState();

    const newOptions = this.filterMapService.generateShowOptions(state.allOptions, action.songs);
    ctx.setState({
      ...state,
      showOptions: newOptions
    });
  }

  @Action(InitFilterOptions)
  InitFilterOptions(ctx: StateContext<FilterMapStateModel>) {
    const state = ctx.getState();

    return this.mapService.fetchMarkers().pipe(
      tap((response: any) => {
        //console.log(response);
        let allOptions = {
          country: options.coruntries,
          region: options.regions,
          city: response[1],
          title: '',
          genre: options.genres,
          found: response[2]
        };

        ctx.setState({
          ...state,
          allOptions: allOptions
        });
      })
    );
  }
}
