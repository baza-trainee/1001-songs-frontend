import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, switchMap, throwError} from 'rxjs';
import {
  ExpeditionArticle, ExpeditionData,
  ExpeditionListResponse
} from '../../interfaces/expedition.interface';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';
import {Category} from "../../interfaces/article.interface";

@Injectable({
  providedIn: 'root'
})

export class ExpeditionsService {
  constructor(private http: HttpClient) {}

    fetchExpeditionCategories() : Observable<ExpeditionData> {
        return this.http.get<ExpeditionData>(`${API_URL}${StatEndpoints.expeditions.categories}`).pipe(
            catchError(error => {
              console.error(error);
              return of({} as ExpeditionData);
            })
        );
    }

    fetchData(id: string) {
       return this.fetchExpeditionById(id).pipe(
            switchMap((response) => {
                return this.fetchExpeditions({id: response.category.id, expedition_exclude: id}).pipe(
                    map((slider) => ({content: response, sliderItem: slider}))
                )
            })
        )
    }

    fetchExpeditionById(expeditionId: string): Observable<ExpeditionArticle> {
        return this.http.get<ExpeditionArticle>(`${API_URL}${StatEndpoints.expeditions.expedition}/${expeditionId}`).pipe(
          catchError(error => {
            console.error(error);
            return of({} as ExpeditionArticle);
          })
        );
    }

    fetchExpeditions(params: { search?: string; id?: number; page?: number; size?: number, expedition_exclude?: string}) : Observable<ExpeditionListResponse> {
        return this.http.get<ExpeditionListResponse>(`${API_URL}${StatEndpoints.expeditions.expeditions}`, {params}).pipe(
          catchError( error => {
            if (error.status === 404) {
              console.error('За вашим запитом нічого не знайденно');
              return of({
                items: [],
                total: 0,
                page: 0,
                size: 0,
                pages: 0,
              });
            } else {
              return throwError(error);
            }
          })
        );
    }
}
