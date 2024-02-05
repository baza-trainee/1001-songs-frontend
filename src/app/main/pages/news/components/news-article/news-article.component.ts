import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import {first, Observable, Subscription} from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { NewsState } from '../../../../../store/news/news.state';
import { FetchNews, SetSelectedArticle } from '../../../../../store/news/news.actions';
import { BreadcrumbsComponent } from 'src/app/shared/shared-components/breadcrumbs/breadcrumbs.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { Slide } from 'src/app/shared/interfaces/slide.interface';
import { Article } from '../../../../../shared/interfaces/article.interface';
import {ShareComponent} from "../../../../../shared/shared-components/share/share.component";
import {FormatTextPipe} from "../../../../../shared/pipes/format-text.pipe";
import {SliderService} from "../../../../../shared/services/slider/slider.service";

@Component({
  selector: 'app-news-article',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, BreadcrumbsComponent, SliderComponent, ShareComponent, FormatTextPipe],
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit, OnDestroy {
  @Select(NewsState.getSelectedArticle) selectedArticle$!: Observable<Article>;
  @Select(NewsState.getArticlesList) articlesList$!: Observable<Article[]>;

  public sliderItems!: Slide[];
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private sliderService: SliderService
  ) {}

  ngOnInit(): void {
    this.initializeData();
  }

  async initializeData() {
    await this.store.dispatch(new FetchNews()).toPromise();

    this.subscriptions.push(
      this.articlesList$.pipe(first()).subscribe(articles => {
        this.store.dispatch(new SetSelectedArticle(this.route.snapshot.params['id']));
        this.sliderItems = this.sliderService.convertNewsToSlide(articles);
      })
    );
  }

  replaceCommaWithBr(inputString: string): string {
    return inputString.replace(/, /g, '<br>');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
