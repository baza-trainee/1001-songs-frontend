import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AboutTeamComponent } from './about-team/about-team.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, AboutTeamComponent, SliderComponent]
})
export class AboutComponent {
  imgSrc = 'https://drive.google.com/uc?export=view&id=1QpsMn5igy2b2ldRloUqVrpryy37v3d21';

  projectsItems = [
    {
      img: this.imgSrc,
      title: '1000 і 1 пісня',
      description: 'Проєкт спрямований для підтримки фонду записів старовинних автентичних пісень українців.'
    },
    {
      img: this.imgSrc,
      title: 'Назва проєкту',
      description: 'Текст опис проєкту'
    },
    {
      img: this.imgSrc,
      title: 'Назва проєкту',
      description: 'Текст опис проєкту'
    },
    {
      img: this.imgSrc,
      title: 'Назва проєкту',
      description: 'Текст опис проєкту'
    }
  ];
}
