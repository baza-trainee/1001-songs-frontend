import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceComponent } from './science.component';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ActivatedRoute} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

describe('ScienceComponent', () => {
  let component: ScienceComponent;
  let fixture: ComponentFixture<ScienceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ScienceComponent, BrowserAnimationsModule, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: { category: 'some_dummy_id' }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ScienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
