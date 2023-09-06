import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home-expedition',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './home-expedition.component.html',
  styleUrls: ['./home-expedition.component.scss']
})
export class HomeExpeditionComponent {

  constructor(private _translate: TranslateService) {}

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
