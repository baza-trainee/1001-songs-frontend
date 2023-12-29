import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { FilterMapState } from './filter-map.state';
import { TranslateModule } from '@ngx-translate/core';

describe('FilterMapState', () => {
  // let store: Store;
  let state: FilterMapState;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([FilterMapState]), HttpClientModule, TranslateModule.forRoot()]
    });
    // store = TestBed.inject(Store);
    state = TestBed.inject(FilterMapState);
  });

  it('should create', () => {
    expect(state).toBeTruthy();
  });
});
