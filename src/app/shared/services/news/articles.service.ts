import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Article} from "../../interfaces/article.interface";
import {API_URL, StatEndpoints} from "../../config/endpoints/stat-endpoints";


@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
    constructor(private http: HttpClient) {}

    fetchNews(): Observable<Article[]> {
        return this.http.get<Article[]>(`${API_URL}${StatEndpoints.news}`).pipe(
            catchError(error => {
                console.error(error);
                return of([]);
            })
        );
    }
}
