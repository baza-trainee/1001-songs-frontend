import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

export interface CarouselItem {
  imgSrc: string,
  imgAlt: string,
  title: string,
  description: string

}
@Component({
  selector: 'app-home-actual',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home-actual.component.html',
  styleUrls: ['./home-actual.component.scss']
})
export class HomeActualComponent {

  constructor(private _translate: TranslateService) {
  }

  carouselItems: CarouselItem[] = [
    {
      imgSrc: './assets/img/home/carousel1.jpg',
      imgAlt: '1000 і 1 пісня',
      title: '1000 і 1 пісня',
      description: 'Проєкт спрямований для підтримки фонду записів старовинних автентичних пісень українців.'
    },
    {
      imgSrc: './assets/img/home/carousel3.jpg',
      imgAlt: 'Назва проєкту',
      title: 'Назва проєкту',
      description: 'Текст опис проєкту'
    },
    {
      imgSrc: './assets/img/home/carousel3.jpg',
      imgAlt: 'Назва проєкту',
      title: 'Назва проєкту',
      description: 'Текст опис проєкту'
    },
    {
      imgSrc: './assets/img/home/carousel4.jpg',
      imgAlt: 'Назва проєкту',
      title: 'Назва проєкту',
      description: 'Текст опис проєкту'
    }
  ]
}
