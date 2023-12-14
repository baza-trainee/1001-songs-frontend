import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Marker, MarkerOfLocation } from 'src/app/shared/interfaces/map-marker';
import { cordsMarkers } from 'src/app/mock-data/markers';
import { FilterMapService } from '../../services/filter-map/filter-map.service';

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, TranslateModule],
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent {
  @Input() popupType: string = 'default';
  @Input() markers: any = [
    {
      location__official_name_city: 'Полтава',
      location__coordinates: '49.64704142664784, 34.42447708',
      count: 1
    }
  ];
  @Output() markerClicked = new EventEmitter<MarkerOfLocation>();

  private currentInfoWindow: MapInfoWindow | null = null;
  selectedMarker: MarkerOfLocation | null = null;
  showInfoWindow: boolean = false;
  mapOptions = {
    center: { lat: 48.379433, lng: 31.165579 },
    zoom: 6,
    options: { mapId: 'bcf460a73f14398b', disableDefaultUI: true }
  };
  constructor(
    private _translate: TranslateService,
    public filterMapServices: FilterMapService
  ) {
    // console.log(this.markers)
  }

  formatCords(cords: string) {
    const localcords = cords.split(',');
    const lat = Number.parseFloat(localcords[0]);
    const lng = Number.parseFloat(localcords[1]);
    return { lat, lng };
  }

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow, elem: MarkerOfLocation) {
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

  onMarkerClick(marker: MarkerOfLocation) {
    this.selectedMarker = marker;
    this.showInfoWindow = true;
  }

  onCloseInfoWindow(): void {
    this.showInfoWindow = false;
    this.selectedMarker = null;
  }

  getCustomMarkerIcon(cordsAsId: string): google.maps.Icon {
    return {
      url:
        this.selectedMarker?.location__coordinates === cordsAsId
          ? './assets/img/home/icons/place-hover.svg'
          : './assets/img/home/icons/place.svg'
    };
  }
}
