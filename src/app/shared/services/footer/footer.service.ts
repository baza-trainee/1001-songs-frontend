import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';
import {FooterData, FooterPartners} from '../../interfaces/footer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  constructor(private http: HttpClient) {}

  fetchFooterPartners(): Observable<FooterPartners[]> {
    return this.http.get<FooterPartners[]>(`${API_URL}${StatEndpoints.partners}`).pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  fetchFooterInfo(): Observable<FooterData> {
    return this.http.get<FooterData>(`${API_URL}${StatEndpoints.footer}`).pipe(
      catchError((error) => {
        console.error(error);
        return of({} as FooterData);
      })
    );
  }
}
