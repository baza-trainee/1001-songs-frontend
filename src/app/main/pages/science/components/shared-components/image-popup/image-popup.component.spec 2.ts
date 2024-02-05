import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserModule} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";

import {ImagePopupComponent} from "./image-popup.component";

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
