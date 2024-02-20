import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {API_URL, StatEndpoints} from "../../config/endpoints/stat-endpoints";
import {DataAboutContent, AboutTeam} from "../../interfaces/about.interface";

@Injectable({
  providedIn: 'root'
})

export class AboutService {
  constructor(
      private http: HttpClient
  ) {}
    fetchDataAboutContent(): Observable<DataAboutContent> {
    return this.http.get<DataAboutContent>(`${API_URL}${StatEndpoints.about}`).pipe(
      catchError(error => {
        console.error(error);
        return of({ id: 0, content: '' });
      })
    );
}

    fetchAboutTeam(): Observable<AboutTeam[]> {
      return this.http.get<AboutTeam[]>(`${API_URL}${StatEndpoints.team}`).pipe(
          catchError(error => {
              console.error(error);
              return of([]);
          })
      );
    }
}
