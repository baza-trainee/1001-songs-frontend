import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MarkerOfLocation, SongFilter } from '../../interfaces/map-marker';
import { catchError, Observable, of } from 'rxjs';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient) {}

  buildQueryStringFromParams(queryParams: SongFilter = new SongFilter()): string {
    const queryStringParams: string[] = [];

    for (const [searchParam, value] of Object.entries(queryParams)) {
      if (searchParam === 'title' && value !== '') {
        queryStringParams.push(`search=${value}`);
      }
      if (Array.isArray(value) && value.length) {
        const paramIds: string[] = value;
        paramIds.forEach((id) => queryStringParams.push(`${searchParam}_id=${id}`));
      }
    }

    return queryStringParams.length > 0 ? `?${queryStringParams.join('&')}` : '';
  }

  fetchMarkers(queryParams: SongFilter = new SongFilter()): Observable<MarkerOfLocation[]> {
 
    const requestParams: string = this.buildQueryStringFromParams(queryParams);
    return this.http.get<MarkerOfLocation[]>(API_URL + StatEndpoints.map.geotag + requestParams).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return of([]);
      })
    );
  }
  // modifyMarker(marker: { location__city_ua: string; location__coordinates: string; count: number }): MarkerOfLocation {
  //   return { location__city: marker.location__city_ua, location__coordinates: marker.location__coordinates, count: marker.count + '' };
  // }
}
