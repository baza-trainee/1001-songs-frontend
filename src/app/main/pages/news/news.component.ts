import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import {Select, Store} from "@ngxs/store";

import {Article} from "../../../shared/interfaces/article.interface";
import {FilterComponent} from "../../../shared/shared-components/filter/filter.component";
import {ArticleItemComponent} from "./components/article-item/article-item.component";
import {ArticlesService} from "../../../shared/services/news/articles.service";
import {newsCategories} from "../../../shared/enums/newsCategories";
import {FetchArticles} from "../../../store/news/news.actions";
import {NewsState} from "../../../store/news/news.state";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  standalone: true,
  imports: [TranslateModule, RouterOutlet, RouterLink, ArticleItemComponent, FilterComponent, CommonModule, MatPaginatorModule],
  providers: [{ provide: ArticlesService, useClass: ArticlesService }]
})
export class NewsComponent implements OnInit, OnDestroy {
  @Select(NewsState.getArticlesList) setArticles$!: Observable<Article[]>;
  categories: newsCategories[] = Object.values(newsCategories);
  public articles!: Article[];
  public filteredArticle!: Article[];
  private readonly articlesSubscription?: Subscription;

  constructor(private store: Store) {
    this.store.dispatch(new FetchArticles());
    this.articlesSubscription = this.setArticles$.subscribe((data) => {
      this.articles = data;
      this.filteredArticle = data;
      this.pagedItems = this.filteredArticle.slice(0, this.itemsPerPage);
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  pagedItems: Article[] = [];

  pageChanged(event: { pageIndex: number }): void {
    this.currentPage = event.pageIndex + 1;
    this.setPagedItems();
  }

  setPagedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.pagedItems = this.filteredArticle.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    this.setPagedItems();
  }

  ngOnDestroy() {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
  }

  filteredCategory(category: string): void {
    let label: string = 'Усі';
    switch (category) {
      case 'meetings':
        label = 'Зустрічі';
        break;
      case 'lectures':
        label = 'Лекції';
        break;
      case 'publications':
        label = 'Публікації';
        break;
      case 'workshops':
        label = 'Майстер-класи';
        break;
      case 'concerts':
        label = 'Концерти';
        break;
      case 'conferences':
        label = 'Конференції';
        break;
    }

    if (label === 'Усі') {
      this.filteredArticle = this.articles;
    } else {
      this.filteredArticle = this.articles.filter((article) => article.category === label);
    }
  }
}
