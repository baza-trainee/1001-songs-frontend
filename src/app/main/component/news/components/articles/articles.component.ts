import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { ArticleComponent } from '../article/article.component';
import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../article.interface';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [TranslateModule, NgFor, ArticleComponent, RouterLink, FilterComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [{ provide: ArticlesService, useClass: ArticlesService }]
})
export class ArticlesComponent implements OnInit, OnDestroy {
  public articles!: Article[];
  private unSub!: Subscription;

  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unSub = this.articlesService.getArticles().subscribe((articles) => (this.articles = articles));
  }

  filteredArticles(articles: Article[]): void {
    this.articles = articles;
  }

  redirectToArticle(id: number) {
    this.router.navigate(['/article', id]);
  }

  ngOnDestroy(): void {
    if (this.unSub) this.unSub.unsubscribe();
  }
}
