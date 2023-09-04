import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Article } from '../article.interface';
import { articles } from '../utils/mock-data';

@Injectable()
export class ArticlesService {
  private readonly articlesPathUrl = 'https://bt-1001.vercel.app/news ';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesPathUrl);
  }

  getArticle(id: number): Observable<Article> {
    // should be added filter by id for getting an article from articles
    return this.http.get<Article>(this.articlesPathUrl);
  }
}
