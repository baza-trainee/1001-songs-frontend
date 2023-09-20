import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Marker } from 'src/app/shared/interfaces/map-marker';
import { cordsMarkers } from 'src/app/shared/markers';

@Component({
  selector: 'app-interacive-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, TranslateModule],
  templateUrl: './interacive-map.component.html',
  styleUrls: ['./interacive-map.component.scss']
})
export class InteraciveMapComponent {
  @Input() markers: Marker[] | null = cordsMarkers;
  @Output() markerClicked = new EventEmitter<Marker>();

  selectedMarker: Marker | null = null;
  showInfoWindow: boolean = false;
  mapOptions = {
    center: { lat: 48.379433, lng: 31.165579 },
    zoom: 6,
    options: { mapId: 'bcf460a73f14398b', disableDefaultUI: true }
  };
  constructor(private _translate: TranslateService) {}

  listenToRecords() {
    if (this.selectedMarker != null) {
      this.markerClicked.emit(this.selectedMarker);
    }
    this.onCloseInfoWindow();
  }

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
