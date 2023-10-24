import { Injectable } from '@angular/core';
import {API_URL, StatEndpoints} from "../../config/endpoints/stat-endpoints";
import {catchError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Marker, SelectedMarkerFilter} from "../../interfaces/map-marker";

@Injectable({
  providedIn: 'root'
})
export class FilterMapService {

  constructor(private http: HttpClient) {}

  createFilterByMarker(markers: Marker[]): SelectedMarkerFilter {
    const selectedOptions = new SelectedMarkerFilter();

    markers.forEach(item => {
      selectedOptions.country.push(item.location.country);
      selectedOptions.region.push(item.location.region);
      selectedOptions.settlement.push(item.location.district_center);
      selectedOptions.title.push(item.title);
      selectedOptions.genre.push(item.genre_cycle);
      selectedOptions.found.push(item.found);
    });

    selectedOptions.country = [...new Set(selectedOptions.country)];
    selectedOptions.region = [...new Set(selectedOptions.region)];
    selectedOptions.settlement = [...new Set(selectedOptions.settlement)];
    selectedOptions.title = [...new Set(selectedOptions.title)];
    selectedOptions.genre = [...new Set(selectedOptions.genre)];
    selectedOptions.found = [...new Set(selectedOptions.found)];

    return selectedOptions;
  }

  fetchFilteredMarkers() {
    return this.http.get(API_URL + StatEndpoints.songs).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }
}
