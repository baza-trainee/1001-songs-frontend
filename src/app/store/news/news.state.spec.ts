import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import {NewsState} from "./news.state";

describe('NewsState', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([NewsState]), HttpClientModule]
    });
  });

//   it('it should fetch markers', async () => {
//     await store.dispatch(new FetchMarkers()).toPromise();
//     const markers = store.selectSnapshot(MapState.getMarkersList);
//   });

});
