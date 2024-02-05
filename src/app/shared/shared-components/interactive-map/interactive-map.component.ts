import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import {MarkerOfLocation, SongFilter} from 'src/app/shared/interfaces/map-marker';
import { MapState } from 'src/app/store/map/map.state';
import {Select, Store} from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PlayerState } from 'src/app/store/player/player.state';
import { Song } from '../../interfaces/song.interface';
import { srcPopapImgInMap } from "../../../static-data/img-popap-map";
import {Router} from "@angular/router";
import {FetchSongs} from "../../../store/player/player.actions";

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, TranslateModule],
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent implements OnInit, OnDestroy {
  @Input() popupType: string = 'default';
  @Input() markers: MarkerOfLocation[] = [
    {
      location__city: 'Полтава',
      location__coordinates: '49.64704142664784, 34.42447708',
      count: '1'
    }
  ];
  @Output() markerClicked = new EventEmitter<MarkerOfLocation>();
  @Select(MapState.getMarkersList) markers$!: Observable<MarkerOfLocation[]>;
  @Select(PlayerState.getSongs) songs$!: Observable<Song[]>;
  imgSrs: string[] = srcPopapImgInMap;
  destroy$: Subject<void> = new Subject<void>();
  public randomIndex: number = 0;
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
    private router: Router,
    private store: Store
  ) {
    this.markers$.subscribe((markers: MarkerOfLocation[]) => {
      this.markers = markers;
    });
  }

  ngOnInit(): void {
    this.randomIndex = this.getRandomIndex();
    this._translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((translateState: LangChangeEvent) => {
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
    if (this.selectedMarker?.location__city !== marker.location__city) this.randomIndex = this.getRandomIndex();
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

  getRandomIndex(): number {
    return Math.floor(Math.random() * this.imgSrs.length);
  }

  navigateTo(marker: MarkerOfLocation) {
    const updatedFilter: SongFilter = new SongFilter();
    updatedFilter.city.push(marker.location__city as string);

    this.store.dispatch(new FetchSongs(updatedFilter as SongFilter));
    this.router.navigate(['/map']);
  }
}
