import {Injectable} from '@angular/core';
import {catchError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Article} from "../../interfaces/article.interface";
import {environment} from "../../../../environments/environment";
import {StatEndpoints} from "../../config/endpoints/stat-endpoints";


@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
  constructor(private http: HttpClient) {}

  fetchArticles() {
    return this.http.get<Article[]>(`${environment.baseUrl}${StatEndpoints.news}`).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }
}
