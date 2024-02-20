import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {NewsArticle, NewsCategory, NewsResponse} from "../../interfaces/article.interface";
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

    fetchCategory(): Observable<NewsCategory[]> {
        return this.http.get<NewsCategory[]>(`${API_URL}${StatEndpoints.news.categories}`).pipe(
            catchError(error => {
                console.error(error);
                return of([]);
            })
        );
    }

    fetchNews(page?: number, sizePage?: number, idCategory?: number): Observable<NewsResponse> {
        let strSearch = "";
        if (page) strSearch += `?page=${page}`;
        if (idCategory) strSearch += `&category_id=${idCategory}`;
        if (sizePage) strSearch += `&size=${sizePage}`;


        return this.http.get<NewsResponse>(`${API_URL}${StatEndpoints.news.news}` + strSearch).pipe(
            catchError(error => {
                console.error(error);
                return of({} as NewsResponse);
            })
        );
    }
}
