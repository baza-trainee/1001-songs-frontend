import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSliderComponent } from './image-slider.component';
import {BrowserModule} from "@angular/platform-browser";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";

describe('ImageSliderComponent', () => {
  let component: ImageSliderComponent;
  let fixture: ComponentFixture<ImageSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImageSliderComponent, BrowserModule, MatDialogModule, TranslateModule.forRoot()]
    });
    fixture = TestBed.createComponent(ImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
