import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StereoPlayerComponent } from './stereo-player.component';

describe('StereoPlayerComponent', () => {
  let component: StereoPlayerComponent;
  let fixture: ComponentFixture<StereoPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StereoPlayerComponent]
    });
    fixture = TestBed.createComponent(StereoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
