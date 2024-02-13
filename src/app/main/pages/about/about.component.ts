import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Observable} from "rxjs";

import { AboutTeamComponent } from './about-team/about-team.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { Slide } from 'src/app/shared/interfaces/slide.interface';
import {AboutService} from "../../../shared/services/about/about.service";
import {AboutContent} from "../../../shared/interfaces/about.interface";
import {FormattingTextService} from "../../../shared/services/formating-text/formating-text.service";
import {FadeInCarouselComponent} from "../../../shared/shared-components/fade-in-carousel/fade-in-carousel.component";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, AboutTeamComponent, SliderComponent, FadeInCarouselComponent]
})

export class AboutComponent {
  imgSrc = 'https://drive.google.com/uc?export=view&id=1QpsMn5igy2b2ldRloUqVrpryy37v3d21';
  sliderItems: Slide[] = [
    {
      img: this.imgSrc,
      title: '1000 і 1 пісня',
      description: 'Проєкт спрямований для підтримки фонду записів старовинних автентичних пісень українців.',
      id: 0,
      location: 'Локація',
      date: 'Дата події',
    },
    {
      id: 0,
      img: this.imgSrc,
      title: 'Назва проєкту2',
      location: 'Локація',
      date: 'Дата події',
      description: 'Текст опис проєкту'
    },
    {
      id: 0,
      img: this.imgSrc,
      title: 'Назва проєкту3',
      location: 'Локація',
      date: 'Дата події',
      description: 'Текст опис проєкту'
    },
    {
      id: 0,
      img: this.imgSrc,
      location: 'Локація',
      date: 'Дата події',
      title: 'Назва проєкту4',
      description: 'Текст опис проєкту'
    },
    {
      id: 0,
      img: this.imgSrc,
      location: 'Локація',
      date: 'Дата події',
      title: 'Назва проєкту5',
      description: 'Текст опис проєкту'
    }
  ];
  aboutContent$: Observable<AboutContent>;
  iframeContent!: SafeHtml;
  content!: (string | string[] | null)[];

  constructor(
    private translateService: TranslateService,
    private aboutService: AboutService,
    private formattingTextService: FormattingTextService,
    private sanitizer: DomSanitizer
  ) {
    this.aboutContent$ = this.aboutService.fetchAboutContent();
    this.aboutContent$.subscribe(content => {
      this.content = this.formattingTextService.splitText(content.content);
      // this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(this.testfact[2].length);
    });
  }

  protected readonly Array = Array;
}
