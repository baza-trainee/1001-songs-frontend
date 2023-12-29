import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveMapComponent } from './interactive-map.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MarkerOfLocation } from '../../interfaces/map-marker';
import { FilterMapService } from '../../services/filter-map/filter-map.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { MapState } from '../../../store/map/map.state';

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

export const fakeSelectedMarker: MarkerOfLocation = {
  location__city: 'Рокитне',
  location__coordinates: '51.264868970215396, 25.1289613',
  count: '2'
};
class googleMock {}

describe('InteractiveMapComponent', () => {
  let component: InteractiveMapComponent;
  let fixture: ComponentFixture<InteractiveMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), InteractiveMapComponent, GoogleMapsModule, HttpClientModule, NgxsModule.forRoot([MapState])],
      providers: [TranslateService, FilterMapService]
    });

    (window as unknown as { google: googleMock }).google = google;

    fixture = TestBed.createComponent(InteractiveMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should return custom marker icon based on selectedMarkerKey', () => {
  //   const key1 = 'marker1';
  //   const key2 = 'marker2';
  //   component.selectedMarker = fakeSelectedMarker;

  //   const icon1 = component.getCustomMarkerIcon(key1);
  //   const icon2 = component.getCustomMarkerIcon(key2);

  //   expect(icon1?.url).toBe('./assets/img/home/icons/place-hover.svg');
  //   expect(icon2?.url).toBe('./assets/img/home/icons/place.svg');
  // });

  it('should reset selectedMarker and showInfoWindow to false on close info window', () => {
    component.selectedMarker = fakeSelectedMarker;
    component.showInfoWindow = true;

    component.onCloseInfoWindow();

    expect(component.selectedMarker).toBeNull();
    expect(component.showInfoWindow).toBe(false);
  });

  it('should set selectedMarker and showInfoWindow to true on marker click', () => {
    const marker: MarkerOfLocation = fakeSelectedMarker;

    component.onMarkerClick(marker);

    expect(component.selectedMarker).toBe(marker);
    expect(component.showInfoWindow).toBe(true);
  });
});
