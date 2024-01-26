import { Injectable } from '@angular/core';
import {Article} from "../../interfaces/article.interface";
import {Slide} from "../../interfaces/slide.interface";

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor() { }

  convertNewsToSlide(newsArray: Article[]): Slide[] {
    return newsArray.map(news => {
      return {
        id: news.id,
        img: news.photo_1,
        date: news.date,
        title: news.news_title,
        description: "Коротккий опис",
        location: news.location,
      };
    });
  }
}
