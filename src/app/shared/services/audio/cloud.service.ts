import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Song } from '../../interfaces/song.interface';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  constructor(private http: HttpClient) {}

  getSongsByLocation(locationName: string): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}${StatEndpoints.songs}?city=${locationName}`);
  }

  getSongById(id: string): Observable<Song> {
    return this.http.get<Song>(API_URL + StatEndpoints.songs + '/' + id);
  }

  getAudioData(): Observable<Song[]> {
    return this.http.get<Song[]>(environment.api + 'songs');
  }

  // preparateGoogleDriveFileUrl(url: string) {
  //   const fileId = url.split('/').reverse()[1];
  //   return `https://docs.google.com/uc?export=load&id=${fileId}`;
  // }
}
