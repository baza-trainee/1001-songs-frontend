import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import Iexpediton from '../../interfaces/expedition.interface';
import { environment } from 'src/environments/environment';
import { StatEndpoints } from '../../config/endpoints/stat-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionsService {
  constructor(private http: HttpClient) {}

  fetchExpeditions() {
    return this.http.get<Iexpediton[]>(`${environment.baseUrl}${StatEndpoints.expeditions}`).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }
}
