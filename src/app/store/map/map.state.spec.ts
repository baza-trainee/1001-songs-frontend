import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { MapState } from './map.state';
import { cordsMarkers } from 'src/app/mock-data/markers';

describe('ExpeditionsState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MapState]), HttpClientModule]
    });
    store = TestBed.inject(Store);
  });

//   it('it should fetch markers', async () => {
//     await store.dispatch(new FetchMarkers()).toPromise();
//     const markers = store.selectSnapshot(MapState.getMarkersList);
//   });

  it('it should select markers', () => {
    const markers = store.selectSnapshot(MapState.getMarkersList);
    expect(markers[0]).toEqual(cordsMarkers[0]);
  });
});
