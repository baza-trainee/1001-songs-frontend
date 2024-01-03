import {Injectable} from '@angular/core';
import {catchError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {DataArticle} from "../../interfaces/article.interface";
import {API_URL, StatEndpoints} from "../../config/endpoints/stat-endpoints";


@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
  constructor(private http: HttpClient) {}

  fetchArticles() {
    return this.http.get<DataArticle[]>(`${API_URL}${StatEndpoints.news}`).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }
}
