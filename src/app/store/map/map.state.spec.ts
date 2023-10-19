import { TestBed} from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';

import { cordsMarkers } from 'src/app/mock-data/markers';
import { MapState } from './map.state';

describe('MapState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MapState]), HttpClientModule]
    });
    store = TestBed.inject(Store);
  });

  it('should have the same field names in markers', () => {
    const markers = store.selectSnapshot(MapState.getMarkersList);
    const firstMarkerFields = Object.keys(markers[0]);
    const cordsMarkersFields = Object.keys(cordsMarkers[0]);

    expect(firstMarkerFields).toEqual(cordsMarkersFields);
  });

  it('should initialize state with default data', () => {
    const state = store.selectSnapshot(MapState);
    expect(state.markersList).toEqual([
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
    ]);
  });
});
