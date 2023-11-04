import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import Iexpediton, {ArticleExpedition} from '../../interfaces/expedition.interface';
import { environment } from 'src/environments/environment';
import { StatEndpoints } from '../../config/endpoints/stat-endpoints';
import {mockArticleExpedition} from "../../../mock-data/article-expedition";

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

    return article
  }

  fetchExpeditions() {
    return this.http.get<Iexpediton[]>(`${environment.baseUrl}${StatEndpoints.expeditions}`).pipe(
      catchError(async (error) => {
        console.error(error);
      })
    );
  }
}
