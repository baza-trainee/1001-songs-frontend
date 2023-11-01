import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';
import { catchError } from 'rxjs';

import { Marker } from '../../interfaces/map-marker';
import { Song } from '../../interfaces/song.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient) {}

  markerFromSong(song: Song): Marker {
    const cords = song.location.recording_location.split(',');
    console.log(song);
    return {
      id: song.id.toString(),
      title: song.title,
      genre_cycle: song.details['genre_cycle'],
      found: song.archive,
      image: song.media?.['photo_of_performers'] ? song.media['photo_of_performers'] : './assets/img/home/kiivImg.jpg',
      location: {
        country: song.location['country'],
        region: song.location['region'],
        district_center: song.location['official_name_city'],
        recording_location: { lat: Number.parseFloat(cords[0]), lng: Number.parseFloat(cords[1]) }
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
