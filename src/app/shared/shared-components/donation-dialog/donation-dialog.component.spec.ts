import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationDialogComponent } from './donation-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DialogComponent', () => {
  let component: DonationDialogComponent;
  let fixture: ComponentFixture<DonationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DonationDialogComponent, MatDialogModule, HttpClientTestingModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
    });
    fixture = TestBed.createComponent(DonationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
