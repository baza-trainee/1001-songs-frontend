import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marker, SongFilter } from '../../interfaces/map-marker';

@Injectable({
  providedIn: 'root'
})
export class FilterMapService {
  constructor(private http: HttpClient) {}

  filterMarker(selectOptions: SongFilter, markers: Marker[]): Marker[] {
    return markers.filter((marker) => {
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
}
