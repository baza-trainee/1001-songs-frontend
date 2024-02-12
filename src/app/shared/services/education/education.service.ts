import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  constructor(private http: HttpClient) {}

  fetchSongsByGenre(genre: string) {
    return this.http.get(`${API_URL}${StatEndpoints.scienceSongs}?genre=${genre}`);
  }

  fetchSongById(songId: string) {
    const id = songId ? '/' + songId : '';
    return this.http.get(`${API_URL}${StatEndpoints.scienceSongs}${id}`);
  }

  fetchCategoryById(id: string) {
    return this.http.get(`${API_URL}${StatEndpoints.education}/${id}`);
  }

  fetchESData() {
    return this.http.get(`${API_URL}${StatEndpoints.education}`);
  }
}
