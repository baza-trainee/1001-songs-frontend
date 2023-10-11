import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InteractiveMapComponent} from './interactive-map.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {GoogleMapsModule} from '@angular/google-maps';
import {FilterSong} from "../../interfaces/map-marker";
// import { Marker } from '../../interfaces/map-marker';

export const google = {
  maps: {
    Marker: class FakeMarker {
      private map: unknown;

      setMap(map: unknown) {
        this.map = map;
      }
    },
    Size: class {
    },
    LatLng: class {
    },
    Map: class {
      setOptions() {
      }

      fitBounds() {
      }
    }
  }
};

export const fakeSelectedMarker = {
  id: 'marker1',
  title: 'Лєтєла соя',
  genre_cycle: 'Осінь',
  found: 'no-name',
  image: './assets/img/home/kiivImg.jpg',
  location: {
    country: 'Ukraine',
    region: 'Рівне',
    district_center: 'с. Рокитне',
    recording_location: {lat: 50.4501, lng: 30.5234}
  }
};

class googleMock {
}

describe('HomeMapComponent', () => {
  let component: InteractiveMapComponent;
  let fixture: ComponentFixture<InteractiveMapComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), InteractiveMapComponent, GoogleMapsModule],
      providers: [TranslateService]
    });

    (window as unknown as { google: googleMock }).google = google;

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(InteractiveMapComponent);
    component = new InteractiveMapComponent(translateService);
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
    const marker: FilterSong = fakeSelectedMarker;

    component.onMarkerClick(marker);

    expect(component.selectedMarker).toBe(marker);
    expect(component.showInfoWindow).toBe(true);
  });
});
