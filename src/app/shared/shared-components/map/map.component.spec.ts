import { ComponentFixture, TestBed } from '@angular/core/testing';

import {MapComponent} from './map.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {GoogleMapsModule } from "@angular/google-maps";
import { Marker } from '../../interfaces/map-marker';

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
    },
  },
};

export const fakeSelectedMarker = {
  key: 'marker1',
  position: { lat: 0, lng: 0 },
  popup: {title: '', photoUrl: '', countRecords: 0, link: ''}
}
class googleMock {}

describe('HomeMapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), MapComponent, GoogleMapsModule],
      providers: [TranslateService]
    });

    (window as unknown as { google: googleMock }).google = google;

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(MapComponent);
    component = new MapComponent(translateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return custom marker icon based on selectedMarkerKey', () => {
    const key1 = 'marker1';
    const key2 = 'marker2';
    component.selectedMarker = fakeSelectedMarker;

    const icon1 = component.getCustomMarkerIcon(key1);
    const icon2 = component.getCustomMarkerIcon(key2);

    expect(icon1?.url).toBe('./assets/img/home/icons/place-hover.svg');
    expect(icon2?.url).toBe('./assets/img/home/icons/place.svg');
  });

  it('should reset selectedMarker and showInfoWindow to false on close info window', () => {
    component.selectedMarker = fakeSelectedMarker;
    component.showInfoWindow = true;

    component.onCloseInfoWindow();

    expect(component.selectedMarker).toBeNull();
    expect(component.showInfoWindow).toBe(false);
  });

  it('should set selectedMarker and showInfoWindow to true on marker click', () => {
    const marker: Marker = fakeSelectedMarker;

    component.onMarkerClick(marker);

    expect(component.selectedMarker).toBe(marker);
    expect(component.showInfoWindow).toBe(true);
  });
});
