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

  filterByProperty(
      markers: Marker[],
      options: SelectedMarkerFilter,
      nameOption: keyof SelectedMarkerFilter,
      filters: SelectedMarkerFilter
  ): SelectedMarkerFilter {
    let filterMarkers = markers.filter(marker => {
      return (
          (filters.country.length === 0 || filters.country.includes(marker.location.country)) &&
          (filters.region.length === 0 || filters.region.includes(marker.location.region)) &&
          (filters.settlement.length === 0 || filters.settlement.includes(marker.location.district_center)) &&
          (filters.genre.length === 0 || filters.genre.includes(marker.genre_cycle)) &&
          (filters.title.length === 0 || filters.title.includes(marker.title)) &&
          (filters.found.length === 0 || filters.found.includes(marker.found))
      );
    });
    return { ...this.createFilterByMarker(filterMarkers), [nameOption]: options[nameOption]};
  }

  fetchFilteredMarkers() {
    return this.http.get(API_URL + StatEndpoints.songs).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }
}
