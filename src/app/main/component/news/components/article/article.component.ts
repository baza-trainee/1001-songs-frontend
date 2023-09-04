import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Article } from '../../article.interface';
import { ArticlesService } from '../../services/articles.service';
import { LatestNewsComponent } from '../latest-news/latest-news.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, LatestNewsComponent],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [{ provide: ArticlesService, useClass: ArticlesService }]
})
export class ArticleComponent implements OnInit {
  public article$!: Observable<Article[]>;
  public isId!: number;

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isId = +this.route.snapshot.url[1].path;

    if (this.isId) {
      this.article$ = this.articlesService.getArticle(this.isId);
    }
  }

  goBack() {
    this.router.navigate(['/news']);
  }
}
