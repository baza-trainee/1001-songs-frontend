import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink} from '@angular/router';
import {Article} from "../../../../../shared/interfaces/article.interface";
import {Observable, Subscription} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {NewsState} from "../../../../../store/news/news.state";
import {FetchNews, SetSelectedArticle} from "../../../../../store/news/news.actions";

@Component({
  selector: 'app-home-news',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent implements OnInit, OnDestroy {
  @Select(NewsState.getArticlesList) setArticles$!: Observable<Article[]>;
  public articles!: Article[];
  public mainArticle!: Article;
  private readonly articlesSubscription?: Subscription;

  constructor(private _translate: TranslateService,
              private store: Store,
              private router: Router
  ) {
    this.store.dispatch(new FetchNews());
  }

  ngOnInit(): void {
    this.setArticles$.subscribe((data) => {
      this.articles = data.slice(1, 5);
      this.mainArticle = data[0];
    });
  }

  ngOnDestroy() {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
  }

  redirectToNews(id: number | undefined) {
    if (id) {
      this.store.dispatch(new SetSelectedArticle(id));
      this.router.navigate(['/news/' + id])
    } else {
      this.router.navigate(['/404'])
    }
  }
}
