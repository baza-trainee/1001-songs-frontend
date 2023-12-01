import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule, TranslateModule],

  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  imgSrc = 'https://drive.google.com/uc?export=view&id=1QpsMn5igy2b2ldRloUqVrpryy37v3d21';

  @Input() projectsItems: any[] = [
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина1',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина2',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина3',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина4',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина5',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина6',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина7',
      description: 'Короткий опис',
      location: 'Локація'
    }
  ];

  constructor() {}

  prevBtn = `<button class="btn__left">
              <img src="../../../../assets/slider-arrow.svg"/>
            </button>`;

  nextBtn = `<button class="btn__right">
              <img src="../../../../assets/slider-arrow.svg"/>
            </button>`;

  customOptions: OwlOptions = {
    //https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html

    dots: false,
    navSpeed: 500,
    navText: [this.prevBtn, this.nextBtn],
    nav: true,
    autoWidth: false,
    responsive: {
      0: {
        items: 1,
        margin: -30,
        stagePadding: 10
      },
      390: {
        items: 2,
        margin: -80,
        stagePadding: 5,
        autoWidth: true
      },

      768: {
        items: 3,
        margin: -10,
        stagePadding: 20
      },
      1024: {
        items: 4
      }
    }
  };
}
