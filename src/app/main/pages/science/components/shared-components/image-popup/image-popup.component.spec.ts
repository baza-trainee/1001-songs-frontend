import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ImagePopupComponent} from "./image-popup.component";
import {BrowserModule} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";

describe('ImagePopupComponent', () => {
  let component: ImagePopupComponent;
  let fixture: ComponentFixture<ImagePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImagePopupComponent, BrowserAnimationsModule, BrowserModule, MatDialogModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    });
    fixture = TestBed.createComponent(ImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
