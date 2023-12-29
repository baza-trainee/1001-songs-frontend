import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { SongFilter } from '../../shared/interfaces/map-marker';
import { InitFilterOptions, SetShownOptions } from './filter-map.actions';
import { FilterMapService } from '../../shared/services/filter-map/filter-map.service';
import * as options from 'src/app/static-data/filter-options';
import { MapService } from 'src/app/shared/services/map/map.service';
import { tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

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

  @Action(SetShownOptions)
  setShownOptions(ctx: StateContext<FilterMapStateModel>, action: SetShownOptions) {
    const state = ctx.getState();

    const newOptions = this.filterMapService.generateShowOptions(action.songs);

    ctx.setState({
      ...state,
      showOptions: newOptions
    });
  }

  @Action(InitFilterOptions)
  InitFilterOptions(ctx: StateContext<FilterMapStateModel>) {
    const state = ctx.getState();

    return this.filterMapService.fetchFilterOptions().pipe(
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      tap((response: any) => {
        const allOptions: SongFilter = {
          country: options.coruntries,
          region: options.regions,
          city: response[1].list_cities ,
          title: '',
          genre: options.genres,
          found: response[2].list_archives
        };

        ctx.setState({
          ...state,
          allOptions: allOptions
        });
      })
    );
  }
}

// {
// country: string[];
// region: string[];
// city: string[];
// title: string;
// genre: string[];
// found: string[];
// }
