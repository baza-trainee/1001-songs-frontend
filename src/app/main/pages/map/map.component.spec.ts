import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule, Store } from '@ngxs/store';
import { MapState } from 'src/app/store/map/map.state';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), MapComponent, NgxsModule.forRoot([MapState]), HttpClientModule, GoogleMapsModule]
    });
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
