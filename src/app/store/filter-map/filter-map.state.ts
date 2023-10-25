import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";

// import {FilterMapService} from "../../shared/services/filter-map/filter-map.service";
import {Marker} from "../../shared/interfaces/map-marker";
import {SelectCountry} from "./filter-map.actions";

export interface FilterMapStateModel {
  markersList: Marker[];
  selectedOptions: Marker[];
}

@State<FilterMapStateModel>({
  name: 'filterMap',
  defaults: {
    markersList: [],
    selectedOptions: []
  }
})

@Injectable()
export class FilterMapState {
  constructor(
    // private filterService: FilterMapService,
    // private store: Store
  ) {}

  @Selector()
  static getMarkersList(state: FilterMapStateModel): Marker[] {
    return state.markersList;
  }

  @Selector()
  static getSelectedOptions(state: FilterMapStateModel): Marker[] {
    return state.selectedOptions;
  }

  @Action(SelectCountry)
  selectCountry(ctx: StateContext<FilterMapStateModel>) {
    const state = ctx.getState();
    return ctx.setState({
      ...state,
      selectedOptions: []
    })
  }

}
