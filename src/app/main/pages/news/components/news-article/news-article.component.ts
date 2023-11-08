import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { filter, first, Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { NewsState } from '../../../../../store/news/news.state';
import { Article } from '../../../../../shared/interfaces/article.interface';
import { BreadcrumbsComponent } from 'src/app/shared/shared-components/breadcrumbs/breadcrumbs.component';
import { FetchArticles, SetSelectedArticle } from "../../../../../store/news/news.actions";

@Component({
  selector: 'app-news-article',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})

export class NewsArticleComponent implements OnInit {
  @Select(NewsState.getSelectedArticle) selectedArticle$!: Observable<Article>;
  @Select(NewsState.getArticlesList) articles$!: Observable<Article[]>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchArticles());

    this.articles$
      .pipe(
        filter((articles) => articles.length > 0),
        first()
      )
      .subscribe((articles) => {
        const id: number = this.route.snapshot.params['id']
        if (articles.some((article: Article) => +article.id === +id)) {
          this.store.dispatch(new SetSelectedArticle(+id));
        } else {
          this.router.navigate(['/404']);
        }
    });
  }
}
