import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SliderComponent } from './slider.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, SliderComponent]
    });

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;

    component.sliderItems = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
