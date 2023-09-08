import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Article } from '../article.interface';

@Injectable()
export class ArticlesService {
  private readonly articlesPathUrl = 'https://bt-1001.vercel.app/news ';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesPathUrl).pipe(catchError(this.handleError<Article[]>('error from getArticles')));
  }

  getArticle(id: number): Observable<Article[]> {
    // should be added filter by id for getting an article from articles
    return this.http.get<Article[]>(this.articlesPathUrl).pipe(
      map((article: Article[]) => {
        return article.filter((item: Article) => item.id === id);
      }),
      catchError(this.handleError<Article[]>('error from getArticle'))
    );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`An error occurs in ${operation}: `, error);
      return of(result as T);
    };
  }
}
