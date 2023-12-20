import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';

import { Marker, MarkerOfLocation, SongFilter } from '../../interfaces/map-marker';
import { MapState } from '../../../store/map/map.state';
import { CountriesSelectOptions } from 'src/app/static-data/filter-options';
import { RegionsSelectOptions } from 'src/app/static-data/filter-options';
import { GenresSelectOptions } from 'src/app/static-data/filter-options';
import { Song } from '../../interfaces/song.interface';

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
    // selectedOptions: SongFilter,
    allOptions: SongFilter,
    songs: Song[]
    // showOptions: SongFilter,
    //optionName: keyof SongFilter,
    // onlySelectOptionName: keyof SongFilter | undefined
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
    //console.log('generateShowOptions > > > ', songs);
    let newOptions = new SongFilter();
    newOptions.country = [...new Set(songs.map((song) => song.location.country))];
    newOptions.region = [...new Set(songs.map((song) => song.location.region))];
    newOptions.city = [...new Set(songs.map((song) => song.location.official_name_city))];
    newOptions.genre = [...new Set(songs.map((song) => song.details.genre_cycle))];
    newOptions.found = [...new Set(songs.map((song) => song.archive))];
    //newOptions.country = counties
   //console.log('generateShowOptions > > > ', newOptions);
    return newOptions;
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
    const selectedFilterOptions = Object.entries(options).filter((el) => el[1].length > 0);
    let fullRequest = API_URL + StatEndpoints.songs + '?';
    selectedFilterOptions.forEach((option: [string, string[]]) => {
      const optionKey = option[0];
      const optionValues = option[1].map((el) => this.retranslateOption(optionKey, el));
      let req = `${optionKey}=${optionValues.map((el) => this.replaceSpaces(el)).join(',')}&`;
      fullRequest += req;
      console.log(optionKey);
    });
    fullRequest = fullRequest.slice(0, fullRequest.length - 1);

  //  console.log(fullRequest);

    return this.http.get(fullRequest);
  }

  retranslateOption(optionName: string, optionValue: string) {
    // let result : string = '';
    if (optionName === 'country') {
      const target = CountriesSelectOptions.find((country) => country.key === optionValue);
      return target ? target.value : '';
    } else if (optionName === 'regions') {
      const target = RegionsSelectOptions.find((region) => region.key === optionValue);
      return target ? target.value : '';
    } else if (optionName === 'genre') {
      const target = GenresSelectOptions.find((region) => region.key === optionValue);
      return target ? target.value : '';
    } else {
      return optionValue;
    }
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
