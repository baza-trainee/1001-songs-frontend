import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { PlayerState } from './player.state';

describe('ExpeditionsState', () => {
  // let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PlayerState]), HttpClientModule]
    });
    //  store = TestBed.inject(Store);
  });

  //   it('it should fetch markers', async () => {
  //     await store.dispatch(new FetchMarkers()).toPromise();
  //     const markers = store.selectSnapshot(MapState.getMarkersList);
  //   });

  // it('it should select markers', () => {
  //   const markers = store.selectSnapshot(MapState.getMarkersList);
  //   expect(markers[0]).toEqual(cordsMarkers[0]);
  // });
});
