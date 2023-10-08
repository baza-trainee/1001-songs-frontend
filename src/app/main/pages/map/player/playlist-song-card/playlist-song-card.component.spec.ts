import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSongCardComponent } from './playlist-song-card.component';

describe('PlaylistSongCardComponent', () => {
  let component: PlaylistSongCardComponent;
  let fixture: ComponentFixture<PlaylistSongCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlaylistSongCardComponent]
    });
    fixture = TestBed.createComponent(PlaylistSongCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
