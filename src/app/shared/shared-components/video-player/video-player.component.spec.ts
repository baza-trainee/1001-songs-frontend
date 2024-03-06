import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerComponent } from './video-player.component';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).YT = {
      Player: jasmine.createSpy('Player'),
      PlayerState: { PAUSED: 'paused', PLAYING: 'playing' }
    };
    TestBed.configureTestingModule({
      imports: [VideoPlayerComponent]
    });
    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set player property', () => {
    const player = component.playerId;
    expect(player).toBeTruthy();
  });

  it('should isPreviewDisplayed to be true ', () => {
    expect(component.isPreviewDisplayed).toBe(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
