import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';

import { MapFilterComponent } from './map-filter.component';
import { MapState } from '../../../../../store/map/map.state';
import { FilterMapState } from '../../../../../store/filter-map/filter-map.state';

describe('MapFilterComponent', () => {
  let component: MapFilterComponent;
  let fixture: ComponentFixture<MapFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MapFilterComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        NgxsModule.forRoot([MapState, FilterMapState])
      ]
    });

    fixture = TestBed.createComponent(MapFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
