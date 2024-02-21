import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSearchComponent } from './general-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('GeneralSearchComponent', () => {
  let component: GeneralSearchComponent;
  let fixture: ComponentFixture<GeneralSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GeneralSearchComponent, HttpClientTestingModule, BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(GeneralSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
