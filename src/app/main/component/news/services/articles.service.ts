import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { Observable, } from 'rxjs';

import {Article} from '../article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService{
  private readonly articlesPathUrl = 'http://localhost:3000/articles';


  constructor(private http: HttpClient) { }


  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesPathUrl)
  }

  getArcticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.articlesPathUrl}/${id}`)
  }
}
