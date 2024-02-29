import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';
import { Observable, catchError, of } from 'rxjs';
import { EducationSection } from '../../interfaces/science.interface';
import { EducationSong } from '../../interfaces/science-song.interface';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  constructor(private http: HttpClient) {}

  fetchSongsByGenreId(genreId: string) {
    return this.http.get(`${API_URL}${StatEndpoints.education}/${StatEndpoints.genre}/${genreId}/${StatEndpoints.songs}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return of([] as EducationSong[]);
      })
    );
  }

  fetchSongById(songId: string) {
    const id = songId ? '/' + songId : '';
    return this.http.get(`${API_URL}${StatEndpoints.education}/${StatEndpoints.genre}/${StatEndpoints.song}/${id}`);
  }

  fetchCategoryById(id: string) {
    return this.http.get(`${API_URL}${StatEndpoints.education}/${StatEndpoints.educationCategory}/${id}`);
  }

  fetchGenreById(id: string) {
    return this.http.get(`${API_URL}${StatEndpoints.education}/${StatEndpoints.genre}/${id}`);
  }

  fetchESData(): Observable<EducationSection> {
    return this.http.get<EducationSection>(`${API_URL}${StatEndpoints.education}`);
  }
}
