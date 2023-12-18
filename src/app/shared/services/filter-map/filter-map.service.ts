import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';

import { Marker, MarkerOfLocation, SongFilter } from '../../interfaces/map-marker';
import { MapState } from '../../../store/map/map.state';

@Injectable({
  providedIn: 'root'
})
export class FilterMapService {
  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  countSongsByOption(option: string): any {
    const filteredMarkers = this.store.selectSnapshot(MapState.getFilteredMarkerList);

    // const foundMarkers = filteredMarkers.filter((marker) => {
    //   return (
    //     marker.location.country.toLowerCase().includes(option.toLowerCase()) ||
    //     marker.location.region.toLowerCase().includes(option.toLowerCase()) ||
    //     marker.genre_cycle.toLowerCase().includes(option.toLowerCase()) ||
    //     marker.found.toLowerCase().includes(option.toLowerCase()) ||
    //     marker.location.district_center.toLowerCase().includes(option.toLowerCase())
    //   );
    // });

    // return foundMarkers.length;
  }

  filterMarkers(selectOptions: SongFilter) {
    // const markers = this.store.selectSnapshot(MapState.getMarkersList);
    // if (this.isFilteredEmpty(selectOptions)) {
    //   return markers;
    // }
    // return markers.filter((marker) => {
    //   return (
    //     (!selectOptions.country.length || selectOptions.country.includes(marker.location.country)) &&
    //     (!selectOptions.region.length || selectOptions.region.includes(marker.location.region)) &&
    //     (!selectOptions.settlement.length || selectOptions.settlement.includes(marker.location.district_center)) &&
    //     (!selectOptions.genre.length || selectOptions.genre.includes(marker.genre_cycle)) &&
    //     (!selectOptions.title.length || selectOptions.title.includes(marker.title)) &&
    //     (!selectOptions.found.length || selectOptions.found.includes(marker.found))
    //   );
    // });
  }

  isFilteredEmpty(selectOptions: SongFilter): boolean {
    return (
      !selectOptions.country.length &&
      !selectOptions.region.length &&
      !selectOptions.city.length &&
      !selectOptions.genre.length &&
      !selectOptions.title.length &&
      !selectOptions.found.length
    );
  }

  generateShowOptions(
    // filterMarkers: MarkerOfLocation[],
    selectedOptions: SongFilter,
    allOptions: SongFilter,
    showOptions: SongFilter,
    optionName: keyof SongFilter,
    onlySelectOptionName: keyof SongFilter | undefined
  ): SongFilter {
    // if (this.isFilteredEmpty(selectedOptions)) {
    //   return allOptions;
    // } else if (optionName && selectedOptions[optionName].length) {
    //   return {
    //     ...this.createFilterByMarker(filterMarkers),
    //     [optionName]: showOptions[optionName]
    //   };
    // } else if (onlySelectOptionName && selectedOptions[onlySelectOptionName].length) {
    //   return {
    //     ...this.createFilterByMarker(filterMarkers),
    //     [onlySelectOptionName]: allOptions[onlySelectOptionName]
    //   };
    // } else {
    //   return { ...this.createFilterByMarker(filterMarkers) };
    // }
    return allOptions;
  }

  createFilterByMarker(markers: MarkerOfLocation[]): SongFilter {
    const selectedOptions = new SongFilter();

    markers.forEach((item) => {
      // selectedOptions.country.push(item.location.country);
      // selectedOptions.region.push(item.location.region);
      // selectedOptions.settlement.push(item.location.district_center);
      // selectedOptions.title.push(item.title);
      // selectedOptions.genre.push(item.genre_cycle);
      // selectedOptions.found.push(item.found);
    });

    // selectedOptions.country = [...new Set(selectedOptions.country)];
    // selectedOptions.region = [...new Set(selectedOptions.region)];
    // selectedOptions.settlement = [...new Set(selectedOptions.settlement)];
    // selectedOptions.title = [...new Set(selectedOptions.title)];
    // selectedOptions.genre = [...new Set(selectedOptions.genre)];
    // selectedOptions.found = [...new Set(selectedOptions.found)];

    return selectedOptions;
  }

  fetchSongsByFilter(options: SongFilter) {
    console.log('getFilteredSongs', options);
    // const req = Object.entries(options);
    // console.log(req);
    const selectedFilterOptions = Object.entries(options).filter((el) => el[1].length > 0);
    let fullRequest = API_URL + StatEndpoints.songs + '?';
    selectedFilterOptions.forEach((option: [string, string[]]) => {
      console.log(option);
      //  if(option[])
      let req = `${option[0]}=${option[1].map(el => this.replaceSpaces(el)).join(',')}&`;
      fullRequest += req;
    });
    fullRequest = fullRequest.slice(0, fullRequest.length - 1);
    this.http.get(fullRequest).subscribe(d => console.log(d))
    console.log(fullRequest);
  }

  searchSongsByTitle(title: string) {
    return this.http.get(API_URL + StatEndpoints.songs + '?title=' + title).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }

  private replaceSpaces(strWithSpaces: string) {
    const patch = '%20';
    return strWithSpaces.trim().replaceAll(' ', patch);
  }
}
