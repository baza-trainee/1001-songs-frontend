import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, of, zip} from 'rxjs';

import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';

import {
    CityDropdown,
    CountryDropdown,
    RegionDropdown,
    FoundDropdown,
    GenreDropdown, OptionsSongFilter, SongFilter,
} from '../../interfaces/map-marker';

@Injectable({
  providedIn: 'root'
})

export class FilterMapService {
  constructor(
    private http: HttpClient,
  ) {}

    setOptions(queryParams: SongFilter = new SongFilter()): Observable<OptionsSongFilter> {
        const country$ = this.fetchDropdown<CountryDropdown[]>(API_URL + StatEndpoints.mapFilter.countries, queryParams);
        const region$ = this.fetchDropdown<RegionDropdown[]>(API_URL + StatEndpoints.mapFilter.regions, queryParams);
        const city$ = this.fetchDropdown<CityDropdown[]>(API_URL + StatEndpoints.mapFilter.cities, queryParams);
        const genre$ = this.fetchDropdown<GenreDropdown[]>(API_URL + StatEndpoints.mapFilter.genres, queryParams);
        const found$ = this.fetchDropdown<FoundDropdown[]>(API_URL + StatEndpoints.mapFilter.founds, queryParams);

        return zip(country$, region$, city$, genre$, found$).pipe(
            map(([country, region, city, genre, found]) => ({
                country,
                region,
                city,
                genre,
                found
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
        console.log(options)

        let fullRequest = API_URL + StatEndpoints.songs + '?';
        //let searchRequest = '';

        fullRequest = fullRequest.slice(0, fullRequest.length - 1);

        //console.log(fullRequest);

        return this.http.get(fullRequest);
    }

    fetchSongById(id: string) {
        const url = API_URL + StatEndpoints.songs;
        const option = id ? '/' + id : '';
        return this.http.get(url + option);
    }

    fetchDropdown<T>(endpoint: string , queryParams = new SongFilter()): Observable<T> {
        let strID: string = "?";

        Object.entries(queryParams).forEach(([searchParam, value]) => {
            if (Array.isArray(value)) {
                if(value.length) {
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
