import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';
import { catchError } from 'rxjs';
import {FilterSong, SelectedOptions} from '../../interfaces/map-marker';
import { Song } from '../../interfaces/song';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient) {}

  getAllProperty(songs: FilterSong[]): SelectedOptions {
    const selectedOptions: SelectedOptions = {
      country: [],
      region: [],
      district_center: [],
      title: [],
      genre_cycle: [],
      found: []
    };

    songs.forEach(item => {
      selectedOptions.country.push(item.location.country);
      selectedOptions.region.push(item.location.region);
      selectedOptions.district_center.push(item.location.district_center);
      selectedOptions.title.push(item.title);
      selectedOptions.genre_cycle.push(item.genre_cycle);
      selectedOptions.found.push(item.found);
    });

    selectedOptions.country = [...new Set(selectedOptions.country)];
    selectedOptions.region = [...new Set(selectedOptions.region)];
    selectedOptions.district_center = [...new Set(selectedOptions.district_center)];
    selectedOptions.title = [...new Set(selectedOptions.title)];
    selectedOptions.genre_cycle = [...new Set(selectedOptions.genre_cycle)];
    selectedOptions.found = [...new Set(selectedOptions.found)];

    return selectedOptions;
  }

  getAllSongsFromFilter(song: Song): FilterSong {
    const cords = song.location.recording_location.split(',');
    const filter: FilterSong = {
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
    return filter;
  }

  fetchMarkers() {
    return this.http.get(API_URL + StatEndpoints.songs).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }
}
