import {Component, OnDestroy} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngxs/store";

import {NewsCategory, NewsResponse} from "../../../shared/interfaces/article.interface";
import {FilterComponent} from "../../../shared/shared-components/filter/filter.component";
import {ArticleItemComponent} from "./components/article-item/article-item.component";
import {ArticlesService} from "../../../shared/services/news/articles.service";
import {PaginationComponent} from "../../../shared/shared-components/pagination/pagination.component";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  standalone: true,
  imports: [TranslateModule, RouterOutlet, RouterLink, ArticleItemComponent, FilterComponent, CommonModule, PaginationComponent],
  providers: [{ provide: ArticlesService, useClass: ArticlesService }]
})

export class NewsComponent implements OnDestroy {
  public newsResponse$!: Observable<NewsResponse>;
  public categories$!: Observable<NewsCategory[]>;
  private readonly articlesSubscription?: Subscription;

  private itemsPerPage: number = 3;
  public currentPage: number = 1;
  public totalPage: number = 1;

  constructor(
      private store: Store,
      private articleService: ArticlesService
  ) {
    this.newsResponse$ = this.articleService.fetchNews(this.currentPage, this.itemsPerPage);
    this.categories$ = this.articleService.fetchCategory();

    this.articlesSubscription = this.newsResponse$.subscribe((response) => {
      this.totalPage = response.pages;
    })
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.newsResponse$ = this.articleService.fetchNews(this.currentPage, this.itemsPerPage);
  }

  ngOnDestroy() {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
  }

  filteredCategory(id: number): void {
    this.newsResponse$ = this.articleService.fetchNews(this.currentPage, this.itemsPerPage, id);
  }
}
