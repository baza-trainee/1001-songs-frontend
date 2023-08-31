import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { Article } from '../article.interface';
import { articles } from '../utils/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private readonly articlesPathUrl = null;

  getArticles(): Observable<Article[]> {
    return of(articles);
  }

  getArticle(id: number): Observable<Article> {
    return of(...articles.filter((article: Article) => article.id === id));
  }
}
