import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GoogleMapsModule, MapInfoWindow, MapMarker} from '@angular/google-maps';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import {FilterSong} from 'src/app/shared/interfaces/map-marker';

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, TranslateModule],
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent {
  @Input() popupType: string = 'default';
  @Input() markers!: FilterSong[] | null;
  @Output() markerClicked = new EventEmitter<FilterSong>();

  public selectedMarker: FilterSong | null = null;
  public showInfoWindow: boolean = false;
  public readonly mapOptions = {
    center: { lat: 48.379433, lng: 31.165579 },
    zoom: 6,
    options: { mapId: 'bcf460a73f14398b', disableDefaultUI: true }
  };

  private currentInfoWindow: MapInfoWindow | null = null;

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow, elem: FilterSong) {
    if (this.currentInfoWindow) {
      this.currentInfoWindow.close();
    }
    infoWindow.open(marker);
    this.currentInfoWindow = infoWindow;

    this.onMarkerClick(elem);
  }
  constructor(private _translate: TranslateService) {}

  listenToRecords() {
    if (this.selectedMarker != null) {
      this.markerClicked.emit(this.selectedMarker);
    }
    this.onCloseInfoWindow();
  }

  onMarkerClick(marker: FilterSong) {
    this.selectedMarker = marker;
    this.showInfoWindow = true;
  }
  onCloseInfoWindow(): void {
    this.showInfoWindow = false;
    this.selectedMarker = null;
  }

  getCustomMarkerIcon(key: string): google.maps.Icon {
    return {
      url: this.selectedMarker?.id === key ? './assets/img/home/icons/place-hover.svg' : './assets/img/home/icons/place.svg'
    };
  }
}
