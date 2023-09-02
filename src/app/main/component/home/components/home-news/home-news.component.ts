import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-home-news',
  standalone: true,
    imports: [CommonModule, TranslateModule],
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent {
  newsItems = [
    {
      img: "./assets/img/home/news.jpg",
      title: "Є.Єфремов провів майстеркласи для мішаного та чоловічого гурту у Торунському етнографічному музеї",
      location: "Торунь, Польща",
      date: '9-14 квітня 2022'
    },
    {
      img: "./assets/img/home/news.jpg",
      title: "Стислий текст події",
      location: "Локація",
      date: 'Дата події'
    },
    {
      img: "./assets/img/home/news.jpg",
      title: "Стислий текст події",
      location: "Локація",
      date: 'Дата події'
    },
    {
      img: "./assets/img/home/news.jpg",
      title: "Стислий текст події",
      location: "Локація",
      date: 'Дата події'
    }
  ]
}
