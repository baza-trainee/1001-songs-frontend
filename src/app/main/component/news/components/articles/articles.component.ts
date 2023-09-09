import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../article.interface';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [TranslateModule, NgFor, RouterLink, FilterComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [{ provide: ArticlesService, useClass: ArticlesService }]
})
export class ArticlesComponent implements OnInit {
  public articles!: Article[];
  private readonly articlesService = inject(ArticlesService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.articlesService
      .getArticles()
      .pipe(takeUntilDestroyed())
      .subscribe((articles) => (this.articles = articles));
  }

  filteredArticles(articles: Article[]): void {
    this.articles = articles;
  }

  redirectToArticle(id: number) {
    this.router.navigate(['/article', id]);
  }
}
