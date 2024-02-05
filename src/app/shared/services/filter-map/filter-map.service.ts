import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';

import { SongFilter } from '../../interfaces/map-marker';
import { CountriesSelectOptions, RegionsSelectOptions, GenresSelectOptions } from 'src/app/static-data/filter-options';
import { Song } from '../../interfaces/song.interface';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FilterMapService {
  constructor(
    private http: HttpClient,
    private _translate: TranslateService
  ) {}

  generateShowOptions(songs: Song[]) {
    if (this._translate.store.currentLang === 'en') {
      return this.generateEngShowOptions(songs);
    } else {
      return this.generateUaShowOptions(songs);
    }
  }

  generateUaShowOptions(songs: Song[]): SongFilter {
    const newOptions = new SongFilter();
    newOptions.country = [...new Set(songs.map((song) => this.getTranslateKey('country', song.location.country)))];
    newOptions.region = [...new Set(songs.map((song) => this.getTranslateKey('regions', song.location.region)))];
    newOptions.city = [...new Set(songs.map((song) => song.location.city_ua))];
    newOptions.genre = [...new Set(songs.map((song) => this.getTranslateKey('genre', song.details.genre_cycle)))];
    newOptions.found = [...new Set(songs.map((song) => song.archive_ua))];
    return newOptions;
  }

  generateEngShowOptions(songs: Song[]): SongFilter {
    const newOptions = new SongFilter();
    newOptions.country = [...new Set(songs.map((song) => this.getTranslateKey('country', song.location.country)))];
    newOptions.region = [...new Set(songs.map((song) => this.getTranslateKey('regions', song.location.region)))];
    newOptions.city = [...new Set(songs.map((song) => song.location.city_eng))];
    newOptions.genre = [...new Set(songs.map((song) => this.getTranslateKey('genre', song.details.genre_cycle)))];
    newOptions.found = [...new Set(songs.map((song) => song.archive_eng))];
    return newOptions;
  }

  fetchSongsByFilter(options: SongFilter) {
    const selectedFilterOptions = Object.entries(options).filter((el) => {
      return el[1].length > 0;
    });
    let fullRequest = API_URL + StatEndpoints.songs + '?';
    //let searchRequest = '';
    selectedFilterOptions.forEach((option: [string, string[] | string]) => {
      const optionName = this.preprocesFilterOptionName(option[0]);
      if (typeof option[1] === 'string') {
        const searchQuery = `${optionName}=${this.replaceSpaces(option[1])}&`;
        fullRequest += searchQuery;
        return;
      }
      const optionValues = option[1].map((selectedOption) => this.getOptionValueByKey(optionName, selectedOption));
      const req = `${optionName}=${optionValues.map((el) => this.replaceSpaces(el)).join(',')}&`;
      fullRequest += req;
    });
    fullRequest = fullRequest.slice(0, fullRequest.length - 1);

    console.log(fullRequest);

    return this.http.get(fullRequest);
  }

  private getTranslateKey(optionName: string, optionValue: string) {
    if (optionName === 'country') {
      const target = CountriesSelectOptions.find((country) => country.value === optionValue);
      return target ? target.key : '';
    } else if (optionName === 'regions') {
      const target = RegionsSelectOptions.find((region) => region.value === optionValue);
      return target ? target.key : '';
    } else if (optionName === 'genre') {
      const target = GenresSelectOptions.find((region) => region.value === optionValue);
      return target ? target.key : '';
    } else {
      return optionValue;
    }
  }

  private getOptionValueByKey(optionName: string, optionKey: string) {
    if (optionName === 'country') {
      const target = CountriesSelectOptions.find((country) => country.key === optionKey);
      return target ? target.value : '';
    } else if (optionName === 'region') {
      const target = RegionsSelectOptions.find((region) => region.key === optionKey);
      return target ? target.value : '';
    } else if (optionName === 'genre') {
      const target = GenresSelectOptions.find((genre) => genre.key === optionKey);
      return target ? target.value : '';
    } else {
      return optionKey;
    }
  }

  searchSongsByTitle(title: string) {
    return this.http.get(API_URL + StatEndpoints.songs + '?title=' + title).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }

  fetchSongById(id: string) {
    const url = API_URL + StatEndpoints.songs;
    const option = id ? '/' + id : '';
    return this.http.get(url + option);
  }

  private preprocesFilterOptionName(option: string) {
    if (option === 'found') {
      return this._translate.store.currentLang === 'en' ? 'archive_eng' : 'archive_ua';
    }
    if (option === 'city') {
      return this._translate.store.currentLang === 'en' ? 'city_eng' : 'city_ua';
    } else {
      return option;
    }
  }

  private replaceSpaces(strWithSpaces: string) {
    const patch = '%20';
    return strWithSpaces.trim().replaceAll(' ', patch);
  }

  fetchFilterOptions() {
    return this.http.get(API_URL + StatEndpoints.markers);
    // .pipe(
    //   catchError(async (error) => {
    //     console.error(error);
    //   })
    // );
  }
}
