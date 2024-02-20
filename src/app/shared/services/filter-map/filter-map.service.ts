import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, zip } from 'rxjs';

import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';

import {
  CityDropdown,
  CountryDropdown,
  RegionDropdown,
  FundDropdown,
  GenreDropdown,
  OptionsSongFilter,
  SongFilter
} from '../../interfaces/map-marker';

@Injectable({
  providedIn: 'root'
})
export class FilterMapService {
  constructor(private http: HttpClient) {}

  setOptions(queryParams: SongFilter = new SongFilter()): Observable<OptionsSongFilter> {
    const country$ = this.fetchDropdown<CountryDropdown[]>(API_URL + StatEndpoints.mapFilter.countries, queryParams);
    const region$ = this.fetchDropdown<RegionDropdown[]>(API_URL + StatEndpoints.mapFilter.regions, queryParams);
    const city$ = this.fetchDropdown<CityDropdown[]>(API_URL + StatEndpoints.mapFilter.cities, queryParams);
    const genre$ = this.fetchDropdown<GenreDropdown[]>(API_URL + StatEndpoints.mapFilter.genres, queryParams);
    const fund$ = this.fetchDropdown<FundDropdown[]>(API_URL + StatEndpoints.mapFilter.funds, queryParams);

    return zip(country$, region$, city$, genre$, fund$).pipe(
      map(([country, region, city, genre, fund]) => ({
        country,
        region,
        city,
        genre,
        fund
      }))
    );
  }

  searchSongsByTitle(title: string) {
    return this.http.get(API_URL + StatEndpoints.songs + '?title=' + title).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }

  fetchSongsByFilter(options: SongFilter) {
    // console.log(options);

    let fullRequest = `${API_URL}${StatEndpoints.markers}/${StatEndpoints.filter}/${StatEndpoints.songs}?`;
    //let searchRequest = '';

    const selectedFilterOptions = Object.entries(options).filter((el) => {
      console.log(el);
      return el[1].length > 0;
    });
    // let fullRequest = API_URL + StatEndpoints.songs + '?';
    //let searchRequest = '';
    selectedFilterOptions.forEach((option: [string, string[] | string]) => {
      //const optionName = this.preprocesFilterOptionName(option[0]);
      // if (typeof option[1] === 'string') {
      //   const searchQuery = `${optionName}=${this.replaceSpaces(option[1])}&`;
      //   fullRequest += searchQuery;
      //   return;
      // }
      // const optionValues = option[1].map((selectedOption) => this.getOptionValueByKey(optionName, selectedOption));
      // const req = `${optionName}=${optionValues.map((el) => this.replaceSpaces(el)).join(',')}&`;
      // fullRequest += req;
    });
    fullRequest = fullRequest.slice(0, fullRequest.length - 1);

    console.log('REQUEST ', fullRequest);

    return this.http.get(fullRequest);
  }

  fetchSongById(id: string) {
    const url = API_URL + StatEndpoints.songs;
    const option = id ? '/' + id : '';
    return this.http.get(url + option);
  }

  fetchDropdown<T>(endpoint: string, queryParams = new SongFilter()): Observable<T> {
    let strID: string = '?';

    Object.entries(queryParams).forEach(([searchParam, value]) => {
      if (Array.isArray(value)) {
        if (value.length) {
          value.forEach((id: string[]) => {
            strID += `&${searchParam}_id=${id}`;
          });
        }
      }
    });

    return this.http.get<T>(endpoint + strID).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return of([] as T);
      })
    );
  }
}
