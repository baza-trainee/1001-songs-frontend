import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerComponent } from './video-player.component';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VideoPlayerComponent]
    });
    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should set player property', () => {
  //   const player = component.player;
  //   expect(player).toBeTruthy();
  // });

  // it('should change player src attribute after call playVideo() function', () => {
  //   const urlBefore = component.player.nativeElement.src;
  //   component.playVideo();
  //   expect(component.player.nativeElement.src).not.toEqual(urlBefore);
  // });

  // it('should set isPreviewDisplayed to false after call playVideo() function', () => {
  //   component.playVideo();
  //   expect(component.isPreviewDisplayed).toEqual(false);
  // });

  // it('should isPreviewDisplayed to be true ', () => {
  //   expect(component.isPreviewDisplayed).toBe(true);
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
