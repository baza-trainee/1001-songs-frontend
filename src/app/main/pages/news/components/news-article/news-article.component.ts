import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import {ActivatedRoute, RouterLink} from '@angular/router';

import { BreadcrumbsComponent } from 'src/app/shared/shared-components/breadcrumbs/breadcrumbs.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { Slide } from 'src/app/shared/interfaces/slide.interface';
import { ShareComponent } from "../../../../../shared/shared-components/share/share.component";
import { FormatTextPipe } from "../../../../../shared/pipes/format-text.pipe";
import { SliderService } from "../../../../../shared/services/slider/slider.service";
import {NewsArticle, NewsItem} from "../../../../../shared/interfaces/article.interface";
import { ArticlesService } from "../../../../../shared/services/news/articles.service";
import {
  FadeInCarouselComponent
} from "../../../../../shared/shared-components/fade-in-carousel/fade-in-carousel.component";
import { SafeHtmlPipe } from "../../../../../shared/pipes/safe-html.pipe";
import { ContentTextComponent } from "../../../../../shared/shared-components/content-text/content-text.component";
import {Breadcrumbs} from "../../../../../shared/interfaces/breadcrumbs.interface";
import {ExpeditionCardComponent} from "../../../expeditions/expedition-card/expedition-card.component";
import {NewsCardSliderComponent} from "../news-card-slider/news-card-slider.component";

@Component({
  selector: 'app-news-article',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, BreadcrumbsComponent, SliderComponent, ShareComponent, FormatTextPipe, FadeInCarouselComponent, SafeHtmlPipe, ContentTextComponent, ExpeditionCardComponent, NewsCardSliderComponent],
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit, OnDestroy {
  public article$!: Observable<NewsArticle>
  public sliderItems!: Slide[];
  public sliderItemsDesktop!: NewsItem[];
  private readonly subscriptions: Subscription[] = [];
  breadcrumbs: Breadcrumbs[] = [{path: 'news', name: 'Новини'}];

  constructor(
    private route: ActivatedRoute,
    private sliderService: SliderService,
    private articleService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.subscribeToRouteParams();
    this.fetchArticleContent();
  }

  private subscribeToRouteParams(): void {
    if (this.route.params) {
      this.subscriptions.push(this.route.params.subscribe(params => {
        this.article$ = this.articleService.fetchNewsById(params['id']);
      }));
    }
  }

  private fetchArticleContent(): void {
    if (this.article$) {
      this.subscriptions.push(this.article$.subscribe(response => {
        this.fetchSliderItems(response.id);
      }));
    }
  }

  private fetchSliderItems(id: number): void {
    this.subscriptions.push(
        this.articleService.fetchNews({news_exclude: id}).subscribe(response => {
          this.sliderItemsDesktop = response.items.slice(0, 3);
          this.sliderItems = this.sliderService.convertNewsToSlide(response.items);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
