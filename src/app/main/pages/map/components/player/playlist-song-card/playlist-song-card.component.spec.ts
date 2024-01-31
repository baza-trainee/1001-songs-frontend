import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSongCardComponent } from './playlist-song-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { PlayerState } from 'src/app/store/player/player.state';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";

describe('PlaylistSongCardComponent', () => {
  let component: PlaylistSongCardComponent;
  let fixture: ComponentFixture<PlaylistSongCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlaylistSongCardComponent, TranslateModule.forRoot(), NgxsModule.forRoot([PlayerState]), HttpClientModule],
      providers: [{
        provide: ActivatedRoute, useValue: {}
      }]
    });
    fixture = TestBed.createComponent(PlaylistSongCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
