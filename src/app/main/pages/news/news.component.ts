import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {NgForOf} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

import {Article} from "./article.interface";
import {ArticlesService} from "./services/articles.service";
import {FilterComponent} from "../../../shared/shared-components/filter/filter.component";
import {ArticleItemComponent} from "./components/article-item/article-item.component";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    RouterOutlet,
    RouterLink,
    ArticleItemComponent,
    FilterComponent,
    NgForOf,
  ],
  providers: [{ provide: ArticlesService, useClass: ArticlesService }]
})

export class NewsComponent implements OnInit {
public readonly categories: string[] = ['Усі', 'Зустрічі', 'Лекції', 'Публікації', 'Майстер-класи', 'Концерти', 'Конференції'];
public articles!: Article[];
private readonly articlesService = inject(ArticlesService);
private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.articlesService
      .getArticles()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((articles) => (this.articles = articles));
  }

  filteredArticles(articles: Article[]): void {
    this.articles = articles;
  }
}
