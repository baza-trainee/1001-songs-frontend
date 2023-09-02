import { ComponentFixture, TestBed } from '@angular/core/testing';

import {HomeMapComponent, Marker} from './home-map.component';

describe('HomeMapComponent', () => {
  let component: HomeMapComponent;
  let fixture: ComponentFixture<HomeMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMapComponent],
    });

    fixture = TestBed.createComponent(HomeMapComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have markers', () => {
    expect(component.cordsMarkers.length).toBeGreaterThan(0);
  });

  it('should handle marker click', () => {
    const marker: Marker = {
      key: 'marker1',
      position: { lat: 50.4501, lng: 30.5234 },
      popup: {
        title: 'с. Крячківка, Полтавська обл.',
        photoUrl: './assets/img/home/kiivImg.jpg',
        countRecords: 20,
        link: '#',
      },
    };

    component.onMarkerClick(marker.key);

    expect(component.selectedMarkerKey).toBe(marker.key);
    expect(component.showInfoWindow).toBe(true);
  });

  it('should close info window', () => {
    component.onCloseInfoWindow();

    expect(component.selectedMarkerKey).toBe(null);
    expect(component.showInfoWindow).toBe(false);
  });

  it('should get custom marker icon', () => {
    const markerKey = 'marker1';
    const icon = component.getCustomMarkerIcon(markerKey);

    expect(icon.url).toContain('place.svg');
    expect(icon.scaledSize?.width).toBe(56);
    expect(icon.scaledSize?.height).toBe(56);
  });
});
