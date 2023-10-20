import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GoogleMapsModule, MapInfoWindow, MapMarker} from '@angular/google-maps';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Marker } from 'src/app/shared/interfaces/map-marker';
import { cordsMarkers } from 'src/app/mock-data/markers';

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, TranslateModule],
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent {
  @Input() popupType: string = 'default';
  @Input() markers: Marker[] | null = cordsMarkers;
  @Output() markerClicked = new EventEmitter<Marker>();

  private currentInfoWindow: MapInfoWindow | null = null;
  selectedMarker: Marker | null = null;
  showInfoWindow: boolean = false;
  mapOptions = {
    center: { lat: 48.379433, lng: 31.165579 },
    zoom: 6,
    options: { mapId: 'bcf460a73f14398b', disableDefaultUI: true }
  };
  constructor(private _translate: TranslateService) {}

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow, elem: Marker) {
    if (this.currentInfoWindow) {
      this.currentInfoWindow.close();
    }
    infoWindow.open(marker);
    this.currentInfoWindow = infoWindow;

    this.onMarkerClick(elem);
  }

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

  getCustomMarkerIcon(id: string): google.maps.Icon {
    return {
      url: this.selectedMarker?.id === id ? './assets/img/home/icons/place-hover.svg' : './assets/img/home/icons/place.svg'
    };
  }
}
