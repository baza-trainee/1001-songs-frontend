import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { filter, first, Observable, Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { NewsState } from '../../../../../store/news/news.state';
import { Article } from '../../../../../shared/interfaces/article.interface';
import { BreadcrumbsComponent } from 'src/app/shared/shared-components/breadcrumbs/breadcrumbs.component';
import { FetchArticles, SetSelectedArticle } from '../../../../../store/news/news.actions';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { Slide } from 'src/app/shared/interfaces/slide.interface';

@Component({
  selector: 'app-news-article',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, BreadcrumbsComponent, SliderComponent],
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit {
  @Select(NewsState.getSelectedArticle) selectedArticle$!: Observable<Article>;
  @Select(NewsState.getArticlesList) articles$!: Observable<Article[]>;

  sliderTitle!: string;
  private langChangeSubscription: Subscription;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.getTranslation();
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.getTranslation(); 
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchArticles());

    this.articles$
      .pipe(
        filter((articles) => articles.length > 0),
        first()
      )
      .subscribe((articles) => {
        const id: number = this.route.snapshot.params['id'];
        if (articles.some((article: Article) => +article.id === +id)) {
          this.store.dispatch(new SetSelectedArticle(+id));
        } else {
          this.router.navigate(['/404']);
        }
      });
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

  changeLanguage() {
    this.langChangeSubscription.unsubscribe();
  }
}
