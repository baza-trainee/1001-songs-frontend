import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StereoPlayerComponent } from './stereo-player.component';
import { NgxsModule } from '@ngxs/store';
import { PlayerState } from 'src/app/store/player/player.state';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

describe('StereoPlayerComponent', () => {
  let component: StereoPlayerComponent;
  let fixture: ComponentFixture<StereoPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StereoPlayerComponent, NgxsModule.forRoot([PlayerState]), HttpClientModule, TranslateModule.forRoot()]
    });
    fixture = TestBed.createComponent(StereoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
