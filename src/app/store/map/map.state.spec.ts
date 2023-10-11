import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import {MapState, MapStateModel} from './map.state';

describe('ExpeditionsState', () => {
  let store: Store;
  const initialState: MapStateModel = {
    filterSongs: [
      {
        id: 'marker1',
        title: 'Лєтєла соя',
        genre_cycle: 'Осінь',
        found: 'no-name',
        image: './assets/img/home/kiivImg.jpg',
        location: {
          country: 'Ukraine',
          region: 'Рівне',
          district_center: 'с. Рокитне',
          recording_location: { lat: 50.4501, lng: 30.5234  }
        }
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MapState]), HttpClientModule]
    });
    store = TestBed.inject(Store);
    store.reset({ map: initialState });
  });

  it('it should select markers', () => {
    const markers = store.selectSnapshot(MapState.getFilterSongs);
    expect(markers[0]).toEqual(initialState.filterSongs[0]);
  });
});
