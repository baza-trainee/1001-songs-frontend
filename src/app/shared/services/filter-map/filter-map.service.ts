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
import { PlaylistSong } from '../../interfaces/song.interface';
import { MAP_PAGE_AMOUNT_SONGS } from '../../config/pagination.constatnts';

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

  fetchSongsByFilter(options: SongFilter, pagination = {page:1 ,size: MAP_PAGE_AMOUNT_SONGS}) {
    let fullRequest = `${API_URL}${StatEndpoints.markers}/${StatEndpoints.filter}/${StatEndpoints.songs}`;
    const paginationParams = `page=1&size=3`;

    const search = options.title ? `search=${options.title}` : '';
    const country = options.country.length ? options.country.map((country) => `country_id=${country}`) : '';
    const region = options.region.length ? options.region.map((region) => `region_id=${region}`) : '';
    const city = options.city.length ? options.city.map((city) => `city_id=${city}`) : '';
    const genre = options.genre.length ? options.genre.map((genre) => `genre_id=${genre}`) : '';
    const fund = options.fund.length ? options.fund.map((fund) => `fund_id=${fund}`) : '';
    const fullParams = [search, ...country, ...region, ...city, ...genre, ...fund];

    const requestParams = fullParams.join('&');
    fullRequest += requestParams.length > 0 ? '?' + requestParams : '';

    return this.http.get(fullRequest).pipe(
      catchError(() => {
        return [{} as PlaylistSong];
      })
    );
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
