import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MarkerOfLocation } from 'src/app/shared/interfaces/map-marker';
import { FilterMapService } from '../../services/filter-map/filter-map.service';
import { MapState } from 'src/app/store/map/map.state';
import { Select } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PlayerState } from 'src/app/store/player/player.state';
import { Song } from '../../interfaces/song.interface';

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, TranslateModule],
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent implements OnInit, OnDestroy {
  @Input() popupType: string = 'default';
  @Input() markers: any = [
    {
      location__city: 'Полтава',
      location__coordinates: '49.64704142664784, 34.42447708',
      count: 1
    }
  ];
  @Output() markerClicked = new EventEmitter<MarkerOfLocation>();

  @Select(MapState.getMarkersList) markers$!: Observable<MarkerOfLocation[]>;
  @Select(PlayerState.getSongs) songs$!: Observable<Song[]>;

  private currentInfoWindow: MapInfoWindow | null = null;
  selectedMarker: MarkerOfLocation | null = null;
  showInfoWindow: boolean = false;
  mapOptions = {
    center: { lat: 48.379433, lng: 31.165579 },
    zoom: 6,
    options: { mapId: 'bcf460a73f14398b', disableDefaultUI: true }
  };
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _translate: TranslateService,
    public filterMapServices: FilterMapService
  ) {
    this.markers$.subscribe((markers: MarkerOfLocation[]) => {
      this.markers = markers;
    });
  }

  ngOnInit(): void {
    this._translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((translateState: any) => {
      const currentLang = translateState.lang;
      this.songs$.pipe(takeUntil(this.destroy$)).subscribe((songs) => {
        if (currentLang === 'en') {
          this.markers.forEach((marker: MarkerOfLocation) => {
            const theSong = songs.find((song: Song) => song.location.coordinates === marker.location__coordinates);
            marker.location__city = theSong ? theSong.location.city_eng : 'eng';
          });
        } else {
          this.markers.forEach((marker: MarkerOfLocation) => {
            const theSong = songs.find((song: Song) => song.location.coordinates === marker.location__coordinates);
            marker.location__city = theSong ? theSong.location.city_ua : 'ua';
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
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
