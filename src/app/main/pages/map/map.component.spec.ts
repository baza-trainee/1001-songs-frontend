import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { MapState } from 'src/app/store/map/map.state';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

export const google = {
  maps: {
    Marker: class FakeMarker {
      private map: unknown;
      setMap(map: unknown) {
        this.map = map;
      }
    },
    Size: class {},
    LatLng: class {},
    Map: class {
      setOptions() {}
      fitBounds() {}
    }
  }
};

export const fakeSelectedMarker = {
  key: 'marker1',
  position: { lat: 0, lng: 0 },
  popup: { title: '', photoUrl: '', countRecords: 0, link: '' }
};
class googleMock {}

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), MapComponent, NgxsModule.forRoot([MapState]), HttpClientModule, GoogleMapsModule]
    });

    (window as unknown as { google: googleMock }).google = google;
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
