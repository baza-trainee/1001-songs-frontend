import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SciencePlayerComponent } from './science-player.component';
import { NgxsModule } from '@ngxs/store';
import { PlayerState } from 'src/app/store/player/player.state';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

describe('StereoPlayerComponent', () => {
  let component: SciencePlayerComponent;
  let fixture: ComponentFixture<SciencePlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SciencePlayerComponent, NgxsModule.forRoot([PlayerState]), HttpClientModule, TranslateModule.forRoot()]
    });
    fixture = TestBed.createComponent(SciencePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
