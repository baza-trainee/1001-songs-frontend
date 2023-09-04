import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Article } from '../article.interface';

@Injectable()
export class ArticlesService {
  private readonly articlesPathUrl = 'https://bt-1001.vercel.app/news ';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesPathUrl);
  }

  getArticle(id: number): Observable<Article[]> {
    // should be added filter by id for getting an article from articles
    return this.http.get<Article[]>(this.articlesPathUrl).pipe(
      map((article: Article[]) => {
        return article.filter((item: Article) => item.id === id);
      })
    );
  }
}
