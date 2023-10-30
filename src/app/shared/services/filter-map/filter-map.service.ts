import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marker, SongFilter } from '../../interfaces/map-marker';
import { Store } from '@ngxs/store';
import { MapState } from '../../../store/map/map.state';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterMapService {
  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  countSongsByOption(option: string): number {
    const filteredMarkers = this.store.selectSnapshot(MapState.getFilteredMarkerList);

    const foundMarkers = filteredMarkers.filter((marker) => {
      return (
        marker.location.country.toLowerCase().includes(option.toLowerCase()) ||
        marker.location.region.toLowerCase().includes(option.toLowerCase()) ||
        marker.genre_cycle.toLowerCase().includes(option.toLowerCase()) ||
        marker.found.toLowerCase().includes(option.toLowerCase()) ||
        marker.location.district_center.toLowerCase().includes(option.toLowerCase())
      );
    });

    return foundMarkers.length;
  }

  filterMarker(selectOptions: SongFilter): Marker[] {
    const filteredMarkers = this.store.selectSnapshot(MapState.getMarkersList);

    return filteredMarkers.filter((marker) => {
      return (
        (selectOptions.country.length === 0 || selectOptions.country.includes(marker.location.country)) &&
        (selectOptions.region.length === 0 || selectOptions.region.includes(marker.location.region)) &&
        (selectOptions.settlement.length === 0 || selectOptions.settlement.includes(marker.location.district_center)) &&
        (selectOptions.genre.length === 0 || selectOptions.genre.includes(marker.genre_cycle)) &&
        (selectOptions.title.length === 0 || selectOptions.title.includes(marker.title)) &&
        (selectOptions.found.length === 0 || selectOptions.found.includes(marker.found))
      );
    });
  }

  createFilterByMarker(markers: Marker[]): SongFilter {
    const selectedOptions = new SongFilter();

    markers.forEach((item) => {
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

  searchSongsByTitle(title: string) {
    return this.http.get(API_URL + StatEndpoints.songs + '?title=' + title).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }
}
