import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { MapFilterComponent } from './map-filter.component';

describe('MapFilterComponent', () => {
  let component: MapFilterComponent;
  let fixture: ComponentFixture<MapFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MapFilterComponent, HttpClientTestingModule, TranslateModule.forRoot(), BrowserAnimationsModule]
    });

    fixture = TestBed.createComponent(MapFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
