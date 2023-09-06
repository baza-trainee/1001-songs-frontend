import { ComponentFixture, TestBed } from '@angular/core/testing';

import {HomeMapComponent} from './home-map.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {GoogleMapsModule } from "@angular/google-maps";

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
class googleMock {}

describe('HomeMapComponent', () => {
  let component: HomeMapComponent;
  let fixture: ComponentFixture<HomeMapComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HomeMapComponent, GoogleMapsModule],
      providers: [TranslateService]
    });

    (window as unknown as { google: googleMock }).google = google;

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(HomeMapComponent);
    component = new HomeMapComponent(translateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return custom marker icon based on selectedMarkerKey', () => {
    const key1 = 'marker1';
    const key2 = 'marker2';
    component.selectedMarkerKey = key1;

    const icon1 = component.getCustomMarkerIcon(key1);
    const icon2 = component.getCustomMarkerIcon(key2);

    expect(icon1?.url).toBe('./assets/img/home/icons/place-hover.svg');
    expect(icon2?.url).toBe('./assets/img/home/icons/place.svg');
  });

  it('should reset selectedMarkerKey and showInfoWindow to false on close info window', () => {
    component.selectedMarkerKey = 'marker1';
    component.showInfoWindow = true;

    component.onCloseInfoWindow();

    expect(component.selectedMarkerKey).toBeNull();
    expect(component.showInfoWindow).toBe(false);
  });

  it('should set selectedMarkerKey and showInfoWindow to true on marker click', () => {
    component.selectedMarkerKey = null as string | null;
    component.showInfoWindow = false;

    component.onMarkerClick('marker1');

    expect(component.selectedMarkerKey).toBe('marker1');
    expect(component.showInfoWindow).toBe(true);
  });

});
