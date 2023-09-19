import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';
import { catchError } from 'rxjs';
import { Marker } from '../../interfaces/map-marker';
import { Song } from '../../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient) {}

  markerFromSong(song: Song, i: number): Marker {
    const cords = song.location.recording_location.split(',');
    const marker: Marker = {
      key: song.id.toString(),
      position: { lat: Number.parseFloat(cords[0]), lng: Number.parseFloat(cords[1]) },
      popup: {
        title: song.location['official_name_city'],
        photoUrl: './assets/img/home/kiivImg.jpg',
        countRecords: 1,
        link: ''
      }
    };
    return marker;
  }

  fetchMarkers() {
    return this.http.get(API_URL + StatEndpoints.songs).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }
}
