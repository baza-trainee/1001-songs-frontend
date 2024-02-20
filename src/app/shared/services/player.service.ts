import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, StatEndpoints } from '../config/endpoints/stat-endpoints';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) {}
  fetchSongs() {
    return this.http.get(`${API_URL}${StatEndpoints.markers}/${StatEndpoints.filter}/${StatEndpoints.songs}`);
  }

  fetchSongById(id: number) {
    return this.http.get(`${API_URL}${StatEndpoints.markers}/${StatEndpoints.filter}/${StatEndpoints.songs}/${id}`);
  }

}
