import {Component, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import {Article} from "../../../../../shared/interfaces/article.interface";
import {Observable, Subscription} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {FetchArticles} from "../../../../../store/news/news.actions";
import {NewsState} from "../../../../../store/news/news.state";

@Component({
  selector: 'app-home-news',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent implements OnDestroy {
  @Select(NewsState.getArticlesList) setArticles$!: Observable<Article[]>;
  public articles!: Article[];
  private readonly articlesSubscription?: Subscription;
  constructor(private _translate: TranslateService,
              private store: Store)
  {
    this.store.dispatch(new FetchArticles());
    this.articlesSubscription = this.setArticles$.subscribe((data) => {
      this.articles = data.splice(0, 3);
    });
  }

  ngOnDestroy() {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
  }

  // newsItems = [
  //   {
  //     img: './assets/img/home/news.jpg',
  //     title: 'Є.Єфремов провів майстеркласи для мішаного та чоловічого гурту у Торунському етнографічному музеї',
  //     location: 'Торунь, Польща',
  //     date: '9-14 квітня 2022'
  //   },
  //   {
  //     img: './assets/img/home/news.jpg',
  //     title: 'Стислий текст події',
  //     location: 'Локація',
  //     date: 'Дата події'
  //   },
  //   {
  //     img: './assets/img/home/news.jpg',
  //     title: 'Стислий текст події',
  //     location: 'Локація',
  //     date: 'Дата події'
  //   },
  //   {
  //     img: './assets/img/home/news.jpg',
  //     title: 'Стислий текст події',
  //     location: 'Локація',
  //     date: 'Дата події'
  //   }
  // ];
}
