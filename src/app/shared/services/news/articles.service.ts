import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Article} from "../../interfaces/article.interface";


@Injectable()
export class ArticlesService {
  private readonly articlesPathUrl = 'https://bt-1001.vercel.app/news ';

  constructor(private http: HttpClient) {
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesPathUrl).pipe(catchError(this.handleError<Article[]>('error from getArticles')));
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: string): Observable<T> => {
      console.error(`An error occurs in ${operation}: `, error);
      return of(result as T);
    };
  }
}
