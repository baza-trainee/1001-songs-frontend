import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GoogleMapsModule} from "@angular/google-maps";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

export interface Marker {
  key: string,
  position: {lat: number, lng: number},
  popup: {
    title: string,
    photoUrl: string,
    countRecords: number,
    link: string
  }
}
@Component({
  selector: 'app-home-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, TranslateModule],
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
})
export class HomeMapComponent {

  cordsMarkers: Marker[] = [
    {
      key: 'marker1',
      position: {lat: 50.4501, lng: 30.5234},
      popup: {
        title: 'с. Крячківка, Полтавська обл.',
        photoUrl: './assets/img/home/kiivImg.jpg',
        countRecords: 20,
        link: '#'
      }
    },
    {
      key: 'marker2',
      position: {lat: 49.8397, lng: 24.0297},
      popup: {
        title: 'м. Львів, Львівська обл.',
        photoUrl: './assets/img/home/kiivImg.jpg',
        countRecords: 16,
        link: '#'
      }
    },
    {
      key: 'marker3',
      position: {lat: 48.5132, lng: 32.2597},
      popup: {
        title: 'м. Кропівницький, Черкаська обл.',
        photoUrl: './assets/img/home/kiivImg.jpg',
        countRecords: 7,
        link: '#'
      }
    },
    {
      key: 'marker4',
      position: {lat: 46.4833, lng: 30.7326},
      popup: {
        title: 'м. Одеса, Одеська обл.',
        photoUrl: './assets/img/home/kiivImg.jpg',
        countRecords: 30,
        link: '#'
      }
    },
    {
      key: 'marker5',
      position: {lat: 48.6198, lng: 22.301},
      popup: {
        title: 'м. Ужгород, Закарпатська обл.',
        photoUrl: './assets/img/home/kiivImg.jpg',
        countRecords: 15,
        link: '#'
      }
    }
  ];

  selectedMarkerKey: string | null = null;
  showInfoWindow: boolean = false;

  constructor(
    private _translate: TranslateService
  ) { }

  onMarkerClick(key: string) {
    this.selectedMarkerKey = key;
    this.showInfoWindow = true;
  }

  onCloseInfoWindow(): void {
    this.showInfoWindow = false;
    this.selectedMarkerKey = null;
  }

  getCustomMarkerIcon(key: string): google.maps.Icon {
    return {
      url: this.selectedMarkerKey === key ? './assets/img/home/icons/place-hover.svg' : './assets/img/home/icons/place.svg',
    }
  }
}
