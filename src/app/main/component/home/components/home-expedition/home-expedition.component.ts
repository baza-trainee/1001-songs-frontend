import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-home-expedition',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home-expedition.component.html',
  styleUrls: ['./home-expedition.component.scss']
})
export class HomeExpeditionComponent {
  expeditionItems = [
    {
      img: "./assets/img/home/expedition1.jpg",
      title: "Назва експедиції",
      shortDescription: "Короткий опис",
      location: "Локація",
      date: "дата події"
    },
    {
      img: "./assets/img/home/expedition2.jpg",
      title: "Назва експедиції",
      shortDescription: "Короткий опис",
      location: "Локація",
      date: "12 липня 2023"
    },
    {
      img: "./assets/img/home/expedition3.jpg",
      title: "Назва експедиції",
      shortDescription: "Короткий опис",
      location: "Локація",
      date: "12 липня 2023"
    },
    {
      img: "./assets/img/home/expedition1.jpg",
      title: "Назва експедиції",
      shortDescription: "Короткий опис",
      location: "Локація",
      date: "12 липня 2023"
    }
  ]
}
