import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../article.interface';
import {ArticleItemComponent} from "./article-item/article-item.component";
import {FilterComponent} from "../../../../../shared/shared-components/filter/filter.component";

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [TranslateModule, NgFor, RouterLink, FilterComponent, ArticleItemComponent, FilterComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [{ provide: ArticlesService, useClass: ArticlesService }]
})
export class ArticlesComponent implements OnInit {
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
