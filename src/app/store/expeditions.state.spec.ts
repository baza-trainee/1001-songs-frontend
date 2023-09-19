import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { FetchExpeditions } from './expedition.actions';
import { HttpClientModule } from '@angular/common/http';
import { ExpeditionsState } from './expeditions.state';
import { testExpeditionsData } from '../mock-data/tests';

describe('ExpeditionsState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ExpeditionsState]), HttpClientModule]
    });
    store = TestBed.inject(Store);
  });

  it('it should fetch expeditions', async () => {
    await store.dispatch(new FetchExpeditions()).toPromise();
    const expeditions = store.selectSnapshot(ExpeditionsState.getExpeditionsList);
    expect(expeditions.length).toBe(12);
  });

  it('it should select expeditions', () => {
    const expeditions = store.selectSnapshot(ExpeditionsState.getExpeditionsList);
    expect(expeditions).toEqual(testExpeditionsData);
  });
});
