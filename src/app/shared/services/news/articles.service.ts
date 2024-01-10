import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Article, DataArticle, DataNews} from "../../interfaces/article.interface";
import {API_URL, StatEndpoints} from "../../config/endpoints/stat-endpoints";


@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
    constructor(private http: HttpClient) {}
    combineArticle(dataArticle: DataArticle[] | void, dataNews: DataNews[] | void): Article[] {
        if (!dataArticle || !dataNews) {
            return [];
        }
        return dataArticle.map(articleItem => {
            const categoryName = dataNews.find((dataNews: DataNews) => dataNews.id === articleItem.news)?.news_title
            return {
                id: articleItem.id,
                title: articleItem.news_title,
                text: [articleItem.text1, articleItem.text2],
                images: [articleItem.photo1, articleItem.photo2],
                location: articleItem.location,
                eventDate: articleItem.date,
                authors: [
                    {
                        seekers: [articleItem.author],
                        editor: articleItem.editor,
                        video: articleItem.editor,
                        records: articleItem.editor
                    }
                ],
                category: categoryName ? categoryName : "" ,
                date: articleItem.date
            };
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }

    fetchNewsDetail(): Observable<DataArticle[]> {
        return this.http.get<DataArticle[]>(`${API_URL}${StatEndpoints.news}/detail`).pipe(
            catchError(error => {
                console.error(error);
                return of([]);
            })
        );
    }
    fetchNews(): Observable<DataNews[]> {
        return this.http.get<DataNews[]>(`${API_URL}${StatEndpoints.news}`).pipe(
            catchError(error => {
                console.error(error);
                return of([]);
            })
        );
    }
}
