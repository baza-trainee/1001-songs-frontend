import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MarkerOfLocation } from '../../interfaces/map-marker';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient) {}

  modifyMarker(marker: { location__city_ua: string; location__coordinates: string; count: number }): MarkerOfLocation {
    return { location__city: marker.location__city_ua, location__coordinates: marker.location__coordinates, count: marker.count + '' };
  }
}
