import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Article } from '../article.interface';

@Injectable()
export class ArticlesService {
  private readonly articlesPathUrl = 'https://bt-1001.vercel.app/news ';
  private readonly http = inject(HttpClient);

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesPathUrl).pipe(catchError(this.handleError<Article[]>('error from getArticles')));
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`An error occurs in ${operation}: `, error);
      return of(result as T);
    };
  }
}
