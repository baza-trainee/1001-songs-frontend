import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
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

  // fetchExpeditionsList(searchParam: string) {
  //   const params = searchParam ? `&search=${searchParam}` : '';
  //   return this.http.get(`${API_URL}/${StatEndpoints.expedition}/${StatEndpoints.filter}${params}`);
  // }
  fetchExpeditionsListByParams(params: { search: string; id?: number }) {
    const searchParam = params.search ? `search=${params.search}` : '';
    const categoryIdParam = params.id ? `id=${params.id}` : '';
    const joinedParams = [searchParam, categoryIdParam].filter((el) => el !== '').join('&');
    const requestParams = joinedParams.length > 0 ? '?' + joinedParams : '';

    return this.http.get(`${API_URL}/${StatEndpoints.expedition}/${StatEndpoints.filter}${requestParams}`);
  }

  fetchExpeditionById(expeditionId: string) {
    return this.http.get(`${API_URL}/${StatEndpoints.expedition}/${expeditionId}`);
  }

  fetchExpeditions() {
    return this.http.get<Iexpediton[]>(`${environment.baseUrl}${StatEndpoints.expeditions}`).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }
}
