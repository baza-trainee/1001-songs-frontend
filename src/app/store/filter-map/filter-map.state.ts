import {Marker} from "../../shared/interfaces/map-marker";
import {Injectable} from "@angular/core";
import {Selector, State, Store} from "@ngxs/store";

export interface FilterMapStateModel {
  markersList: Marker[];
}
@State<FilterMapStateModel>({
  name: 'filterMap',
  defaults: {
    markersList: [
      {
        id: 'marker1',
        title: 'Лєтєла соя',
        genre_cycle: 'Весна',
        found: '',
        image: './assets/img/home/kiivImg.jpg',
        location: {
          country: 'Україна',
          region: 'Полтавська обл.',
          district_center: 'с. Крячківка',
          recording_location: { lat: 50.4501, lng: 30.5234 }
        }
      }
    ]
  }
})
@Injectable()
export class FilterMapState {
  constructor(
    private store: Store
  ) {}

  @Selector()
  static getFilterMarkersList(state: FilterMapStateModel): Marker[] {
    return state.markersList;
  }
}
