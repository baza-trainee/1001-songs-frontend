import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapFilterComponent } from './map-filter.component';
import {TranslateModule} from "@ngx-translate/core";

describe('MapFilterComponent', () => {
  let component: MapFilterComponent;
  let fixture: ComponentFixture<MapFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MapFilterComponent, TranslateModule.forRoot()]
    });

    fixture = TestBed.createComponent(MapFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
