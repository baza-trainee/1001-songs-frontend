import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { AppState } from './app.state';
import { SetIsLoading } from './app.actions';

describe('ExpeditionsState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AppState]), HttpClientModule]
    });
    store = TestBed.inject(Store);
  });

  it('it should set isLoading', async () => {
    await store.dispatch(new SetIsLoading(1));
    const flagIsLoading = store.selectSnapshot(AppState.getIsLoading);
    expect(flagIsLoading).toBe(1);
  });

  it('it should select isLoading', () => {
    const flagIsLoading = store.selectSnapshot(AppState.getIsLoading);
    expect(flagIsLoading).toEqual(0);
  });
});
