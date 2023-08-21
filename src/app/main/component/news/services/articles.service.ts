import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, } from 'rxjs';

import {Article} from '../mockData/mockData'

@Injectable({
  providedIn: 'root'
})
export class ArticlesService{
  private readonly articlesPathUrl = 'http://localhost:3000/articles';


  constructor(private http: HttpClient, private route: ActivatedRoute) { }


  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesPathUrl)
  }

  getArcticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.articlesPathUrl}/${id}`)
  }
}
