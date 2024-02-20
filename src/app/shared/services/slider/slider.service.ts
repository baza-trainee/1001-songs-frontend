import { Injectable } from '@angular/core';
import { NewsItem} from "../../interfaces/article.interface";
import {Slide} from "../../interfaces/slide.interface";

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor() { }

  convertNewsToSlide(newsArray: NewsItem[]): Slide[] {
    return newsArray.splice(0, 10).map(news => {
      return {
        id: news.id,
        img: news.preview_photo,
        date: news.created_at,
        title: news.title,
        description: news.short_description,
        location: news.location,
      };
    });
  }
}
