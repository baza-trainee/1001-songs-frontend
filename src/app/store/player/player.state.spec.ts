import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PlayerState } from './player.state';

describe('PlayerState', () => {
  let store: Store;
  let state: PlayerState;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PlayerState])]
    });
    store = TestBed.inject(Store);
    state = TestBed.inject(PlayerState);
  });

  it('should create', () => {
    expect(state).toBeTruthy();
  });
});
