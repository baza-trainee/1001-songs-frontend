import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSongDetailsComponent } from './playlist-song-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

describe('PlaylistSongDetailsComponent', () => {
  let component: PlaylistSongDetailsComponent;
  let fixture: ComponentFixture<PlaylistSongDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlaylistSongDetailsComponent, TranslateModule.forRoot()],
      providers: [{
        provide: ActivatedRoute, useValue: {}
      }]
    });
    fixture = TestBed.createComponent(PlaylistSongDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
