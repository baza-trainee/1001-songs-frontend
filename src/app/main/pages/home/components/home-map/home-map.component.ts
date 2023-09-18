import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Marker } from 'src/app/shared/interfaces/map-marker';
import { cordsMarkers } from 'src/app/shared/markers';

@Component({
  selector: 'app-home-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, TranslateModule],
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
})
export class HomeMapComponent {
  @Input() markers: Marker[] = cordsMarkers;

  selectedMarker: Marker | null = null;
  showInfoWindow: boolean = false;
 // cords: Marker[] = cordsMarkers;

  mapOptions = {
    center: { lat: 48.379433, lng: 31.165579 },
    zoom: 6,
    options: { mapId: 'bcf460a73f14398b', disableDefaultUI: true }
  };
  constructor(private _translate: TranslateService) {}

  onMarkerClick(marker: Marker) {
    this.selectedMarker = marker;
    this.showInfoWindow = true;
  }

  onCloseInfoWindow(): void {
    this.showInfoWindow = false;
    this.selectedMarker = null;
  }

  getCustomMarkerIcon(key: string): google.maps.Icon {
    return {
      url: this.selectedMarker?.key === key ? './assets/img/home/icons/place-hover.svg' : './assets/img/home/icons/place.svg'
    };
  }
}
