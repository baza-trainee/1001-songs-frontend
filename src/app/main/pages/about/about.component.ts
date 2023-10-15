import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AboutTeamComponent } from './about-team/about-team.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, AboutTeamComponent]
})
export class AboutComponent {
  projectsItems = [
    {
      img: './assets/img/about/our-projects/project-photo-1.jpg',
      title: '1000 і 1 пісня',
      description: 'Проєкт спрямований для підтримки фонду записів старовинних автентичних пісень українців.'
    },
    {
      img: './assets/img/about/our-projects/project-photo-2.jpg',
      title: 'Назва проєкту',
      description: 'Текст опис проєкту'
    },
    {
      img: './assets/img/about/our-projects/project-photo-3.jpg',
      title: 'Назва проєкту',
      description: 'Текст опис проєкту'
    },
    {
      img: './assets/img/about/our-projects/project-photo-4.jpg',
      title: 'Назва проєкту',
      description: 'Текст опис проєкту'
    }
  ];
}
