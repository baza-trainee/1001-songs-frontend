import {Component, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription} from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { NewsState } from '../../../../../store/news/news.state';
import { Article } from '../../../../../shared/interfaces/article.interface';
import { BreadcrumbsComponent } from 'src/app/shared/shared-components/breadcrumbs/breadcrumbs.component';
import { FetchNews, SetSelectedArticle } from '../../../../../store/news/news.actions';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { Slide } from 'src/app/shared/interfaces/slide.interface';
import {ShareComponent} from "../../../../../shared/shared-components/share/share.component";
import {FormatTextPipe} from "../../../../../shared/pipes/format-text.pipe";

@Component({
  selector: 'app-news-article',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, BreadcrumbsComponent, SliderComponent, ShareComponent, FormatTextPipe],
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnDestroy {
  @Select(NewsState.getSelectedArticle) selectedArticle$!: Observable<Article>;

  sliderTitle!: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {
    this.getTranslation();
    this.store.dispatch(new FetchNews()).subscribe(() => {
      this.store.dispatch(new SetSelectedArticle(this.route.snapshot.params['id']));
    });
    this.subscriptions.push(this.translateService.onLangChange.subscribe(() => this.getTranslation()));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  imgSrc = 'https://drive.google.com/uc?export=view&id=1QpsMn5igy2b2ldRloUqVrpryy37v3d21';

  sliderItems: Slide[] = [
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
    }
  ];

  getTranslation() {
    this.translateService.get('news.article.latest-news').subscribe((translated: string) => {
      this.sliderTitle = translated;
    });
  }

  replaceCommaWithBr(inputString: string): string {
    return inputString.replace(/, /g, '<br>');
  }
}
