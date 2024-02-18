import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import Iexpediton, { ArticleExpedition } from '../../interfaces/expedition.interface';
import { environment } from 'src/environments/environment';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';
import { mockArticleExpedition } from '../../../mock-data/article-expedition';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionsService {
  constructor(private http: HttpClient) {}

  createArticle(expedition: Iexpediton): ArticleExpedition {
    const article: ArticleExpedition = mockArticleExpedition;
    article.id = expedition.id;
    article.title = expedition.name;
    article.date_event = expedition.eventDate;
    article.location = expedition.location;
    article.video_1 = expedition.mediaSrc;
    article.video_2 = expedition.mediaSrc;
    article.video_3 = expedition.mediaSrc;
    article.video_4 = expedition.mediaSrc;

    return article;
  }

  fetchExpeditionsListByParams(params: { search: string; id?: number; exclude?: number }) {
    const searchParam = params.search ? `search=${params.search}` : '';
    const categoryIdParam = params.id && params.id > 0 ? `id=${params.id}` : '';
    const excludeIdParam = params.exclude ? `expedition_exclude=${params.exclude}` : '';
    const joinedParams = [searchParam, categoryIdParam, excludeIdParam].filter((el) => el !== '').join('&');
    const requestParams = joinedParams.length > 0 ? '?' + joinedParams : '';
    console.log(requestParams);
    return this.http.get(`${API_URL}/${StatEndpoints.expedition}/${StatEndpoints.filter}${requestParams}`).pipe(
      catchError((error) => {
        console.error(error);
        return of({ items: [] });
      })
    );
  }

  fetchExpeditionCategories() {
    return this.http.get(`${API_URL}/${StatEndpoints.expedition}/${StatEndpoints.categories}`);
  }

  fetchExpeditionById(expeditionId: string) {
    return this.http.get(`${API_URL}/${StatEndpoints.expedition}/${expeditionId}`).pipe(
      catchError(async (error) => {
        console.error(error);
        return of({});
      })
    );
  }

  fetchExpeditions() {
    return this.http.get<Iexpediton[]>(`${environment.baseUrl}${StatEndpoints.expeditions}`).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }
}
