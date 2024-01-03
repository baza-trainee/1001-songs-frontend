import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { PlayerState } from './player.state';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

describe('PlayerState', () => {
  let state: PlayerState;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PlayerState]), HttpClientModule, TranslateModule.forRoot()]
    });
    state = TestBed.inject(PlayerState);
  });

  it('should create', () => {
    expect(state).toBeTruthy();
  });
});
