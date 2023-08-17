import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Article, mockArticles} from '../mockData/mockData'

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }

  getMockArticles(): Observable<Article[]> {
    return of(mockArticles)
  }

  getArcticle(id: number): Observable<Article[]> {
    return of(mockArticles.filter(el => el.id === id))
  }
}
