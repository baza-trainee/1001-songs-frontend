import { Injectable } from '@angular/core';
import { NewsItem} from "../../interfaces/article.interface";
import {Slide} from "../../interfaces/slide.interface";
import {Expedition} from "../../interfaces/expedition.interface";

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor() { }

  sliderItemFromExpedition(expeditionArray: Expedition[]): Slide[] {
    return expeditionArray.splice(0,10).map(expedition => {
      return {
        id: expedition.id,
        img: expedition.preview_photo,
        date: expedition.expedition_date,
        title: expedition.title,
        description: expedition.short_description,
        location: expedition.location
      }
    });
  }

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
