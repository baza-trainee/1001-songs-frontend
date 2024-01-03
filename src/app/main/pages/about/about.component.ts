import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { AboutTeamComponent } from './about-team/about-team.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { Slide } from 'src/app/shared/interfaces/slide.interface';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, AboutTeamComponent, SliderComponent]
})
export class AboutComponent {
  sliderTitle!: string;
  private langChangeSubscription: Subscription;

  imgSrc = 'https://drive.google.com/uc?export=view&id=1QpsMn5igy2b2ldRloUqVrpryy37v3d21';
  sliderItems: Slide[] = [
    {
      img: this.imgSrc,
      title: '1000 і 1 пісня',
      description: 'Проєкт спрямований для підтримки фонду записів старовинних автентичних пісень українців.'
    },
    {
      img: this.imgSrc,
      title: 'Назва проєкту2',
      description: 'Текст опис проєкту'
    },
    {
      img: this.imgSrc,
      title: 'Назва проєкту3',
      description: 'Текст опис проєкту'
    },
    {
      img: this.imgSrc,
      title: 'Назва проєкту4',
      description: 'Текст опис проєкту'
    },
    {
      img: this.imgSrc,
      title: 'Назва проєкту5',
      description: 'Текст опис проєкту'
    }
  ];

  constructor(private translateService: TranslateService) {
    this.getTranslation();
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.getTranslation();
    });
  }

  getTranslation() {
    this.translateService.get('about.projects.title').subscribe((translated: string) => {
      this.sliderTitle = translated;
    });
  }

  changeLanguage() {
    this.langChangeSubscription.unsubscribe();
  }
}
