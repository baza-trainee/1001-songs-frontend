import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Category, NewsArticle, NewsResponse} from "../../interfaces/article.interface";
import {API_URL, StatEndpoints} from "../../config/endpoints/stat-endpoints";


@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
    constructor(private http: HttpClient) {}

    fetchNewsById(id: string): Observable<NewsArticle> {
        return this.http.get<NewsArticle>(`${API_URL}${StatEndpoints.news.news}/` + id).pipe(
            catchError(error => {
                console.error(error);
                return of({} as NewsArticle);
            })
        );
    }

    fetchCategory(): Observable<Category[]> {
        return this.http.get<Category[]>(`${API_URL}${StatEndpoints.news.categories}`).pipe(
            catchError(error => {
                console.error(error);
                return of([]);
            })
        );
    }

    fetchNews(params?: { category_id?: number; page?: number; size?: number, news_exclude?: number}): Observable<NewsResponse> {

        return this.http.get<NewsResponse>(`${API_URL}${StatEndpoints.news.news}`, {params}).pipe(
            catchError(error => {
                console.error(error);
                return of({} as NewsResponse);
            })
        );
    }
}
