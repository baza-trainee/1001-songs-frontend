import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from "@angular/common";
import {Observable, Subscription} from "rxjs";

import {Category, NewsItem, NewsResponse} from "../../../shared/interfaces/article.interface";
import {FilterComponent} from "../../../shared/shared-components/filter/filter.component";
import {ArticleItemComponent} from "./components/article-item/article-item.component";
import {ArticlesService} from "../../../shared/services/news/articles.service";
import {PaginationComponent} from "../../../shared/shared-components/pagination/pagination.component";
import {AMOUNT_CARDS_NEWS_PAGE} from "../../../shared/config/pagination.constatnts";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  standalone: true,
  imports: [TranslateModule, RouterOutlet, RouterLink, ArticleItemComponent, FilterComponent, CommonModule, PaginationComponent],
  providers: [{ provide: ArticlesService, useClass: ArticlesService }]
})

export class NewsComponent implements OnInit, OnDestroy {
  public newsResponse$!: Observable<NewsResponse>;
  public news!: NewsItem[];
  public categories$!: Observable<Category[]>;
  private articlesSubscription?: Subscription;

  private itemsPerPage: number = AMOUNT_CARDS_NEWS_PAGE;
  public currentPage: number = 1;

  constructor(
      private articleService: ArticlesService
  ) {}

  ngOnInit() {
    this.categories$ = this.articleService.fetchCategory();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.newsResponse$ = this.articleService.fetchNews({page: this.currentPage, size: this.itemsPerPage});
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  filteredCategory(id: number): void {
    this.currentPage = 1;
    this.newsResponse$ = this.articleService.fetchNews({page: this.currentPage, size: this.itemsPerPage, category_id: id});
  }

  ngOnDestroy() {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
  }
}
