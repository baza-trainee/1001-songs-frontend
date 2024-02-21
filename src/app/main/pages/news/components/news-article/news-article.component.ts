import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { BreadcrumbsComponent } from 'src/app/shared/shared-components/breadcrumbs/breadcrumbs.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { Slide } from 'src/app/shared/interfaces/slide.interface';
import {ShareComponent} from "../../../../../shared/shared-components/share/share.component";
import {FormatTextPipe} from "../../../../../shared/pipes/format-text.pipe";
import {SliderService} from "../../../../../shared/services/slider/slider.service";
import {NewsArticle} from "../../../../../shared/interfaces/article.interface";
import {ArticlesService} from "../../../../../shared/services/news/articles.service";
import {
  FadeInCarouselComponent
} from "../../../../../shared/shared-components/fade-in-carousel/fade-in-carousel.component";
import {SafeHtmlPipe} from "../../../../../shared/pipes/safe-html.pipe";
import {Content} from "../../../../../shared/interfaces/about.interface";
import {FormattingTextService} from "../../../../../shared/services/formatting-text/formating-text.service";

@Component({
  selector: 'app-news-article',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, BreadcrumbsComponent, SliderComponent, ShareComponent, FormatTextPipe, FadeInCarouselComponent, SafeHtmlPipe],
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit, OnDestroy {
  public article$!: Observable<NewsArticle>
  public sliderItems!: Slide[];
  public content!: Content[];
  private readonly subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private sliderService: SliderService,
    private formattingTextService: FormattingTextService,
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
        this.content = this.formattingTextService.splitText(response.content);
      }));
    }
  }

  private fetchSliderItems(id: number): void {
    this.subscriptions.push(
        this.articleService.fetchNews({news_exclude: id}).subscribe(response => {
          this.sliderItems = this.sliderService.convertNewsToSlide(response.items);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
