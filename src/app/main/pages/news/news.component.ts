import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from "@angular/common";
import {Observable, Subscription} from "rxjs";

import {Category, NewsResponse} from "../../../shared/interfaces/article.interface";
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

export class NewsComponent implements OnInit, OnDestroy {
  public newsResponse$!: Observable<NewsResponse>;
  public categories$!: Observable<Category[]>;
  private articlesSubscription?: Subscription;

  private itemsPerPage: number = 3;
  public currentPage: number = 1;
  public totalPage: number = 1;

  constructor(
      private articleService: ArticlesService
  ) {}

  ngOnInit() {
    this.fetchNews();
    this.fetchCategory();
    this.fetchTotalPage();
  }

  fetchNews() {
    this.newsResponse$ = this.articleService.fetchNews({page: this.currentPage, size: this.itemsPerPage});
  }

  fetchTotalPage() {
    if (this.newsResponse$) {
      this.articlesSubscription = this.newsResponse$.subscribe((response) => {
        this.totalPage = response.pages;
      })
    }
  }

  fetchCategory() {
    this.categories$ = this.articleService.fetchCategory();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.newsResponse$ = this.articleService.fetchNews({page: this.currentPage, size: this.itemsPerPage});
  }

  filteredCategory(id: number): void {
    this.currentPage = 1;
    this.newsResponse$ = this.articleService.fetchNews({page: this.currentPage, size: this.itemsPerPage, category_id: id});
    this.fetchTotalPage();
  }

  ngOnDestroy() {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
  }
}
