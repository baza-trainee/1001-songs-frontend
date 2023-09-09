import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionCardComponent } from './expedition-card.component';

describe('ExpeditionCardComponent', () => {
  let component: ExpeditionCardComponent;
  let fixture: ComponentFixture<ExpeditionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExpeditionCardComponent]
    });
    fixture = TestBed.createComponent(ExpeditionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set player property', () => {
    const player = component.player;
    expect(player).toBeTruthy();
  });

  it('should change player src attribute after call playVideo() function', () => {
    const urlBefore = component.player.nativeElement.src;
    component.playVideo();
    expect(component.player.nativeElement.src).not.toEqual(urlBefore);
  });

  it('should set isPreviewDisplayed to false after call playVideo() function', () => {
    component.playVideo();
    expect(component.isPreviewDisplayed).toEqual(false);
  });

  it('should isPreviewDisplayed to be true ', () => {
    expect(component.isPreviewDisplayed).toBe(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
