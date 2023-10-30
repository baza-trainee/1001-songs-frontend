import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { MapState } from 'src/app/store/map/map.state';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

class googleMock {}

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([MapState]),
        HttpClientModule,
        GoogleMapsModule,
        MapComponent
      ]
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
