import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';
import { catchError } from 'rxjs';

import {Marker, SelectedSongFilter} from '../../interfaces/map-marker';
import { Song } from '../../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient) {}

  createFilterBySongs(songs: Marker[]): SelectedSongFilter {
    const selectedOptions = new SelectedSongFilter();

    songs.forEach(item => {
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
  markerFromSong(song: Song): Marker {
    const cords = song.location.recording_location.split(',');
    return {
      id: song.id.toString(),
      title: song.title,
      genre_cycle: song.details['genre_cycle'],
      found: 'no-name',
      image: song.media?.['image'] ? song.media['image'] : './assets/img/home/kiivImg.jpg',
      location: {
        country: song.location['country'],
        region: song.location['region'],
        district_center: song.location['official_name_city'],
        recording_location: {lat: Number.parseFloat(cords[0]), lng: Number.parseFloat(cords[1])}
      }
    };
  }

  fetchMarkers() {
    return this.http.get(API_URL + StatEndpoints.songs).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }
}
