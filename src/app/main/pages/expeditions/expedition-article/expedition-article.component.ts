import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, first, Observable, Subscription } from 'rxjs';

import { ExpeditionsState } from '../../../../store/expeditions/expeditions.state';
import Iexpediton, { ArticleExpedition } from '../../../../shared/interfaces/expedition.interface';
import { VideoPlayerComponent } from '../../../../shared/shared-components/video-player/video-player.component';
import { FetchExpeditions, SetSelectedExpedition } from '../../../../store/expeditions/expedition.actions';
import { BreadcrumbsComponent } from '../../../../shared/shared-components/breadcrumbs/breadcrumbs.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { Slide } from 'src/app/shared/interfaces/slide.interface';
import {ShareComponent} from "../../../../shared/shared-components/share/share.component";

@Component({
  selector: 'app-expedition-article',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, VideoPlayerComponent, BreadcrumbsComponent, SliderComponent, ShareComponent],
  templateUrl: './expedition-article.component.html',
  styleUrls: ['./expedition-article.component.scss']
})
export class ExpeditionArticleComponent implements OnInit {
  @Select(ExpeditionsState.getSelectedExpedition) selectedExpedition$?: Observable<ArticleExpedition>;
  @Select(ExpeditionsState.getExpeditionsList) expeditionList$!: Observable<Iexpediton[]>;

  sliderTitle!: string;
  private langChangeSubscription: Subscription;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.getTranslation();
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.getTranslation();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchExpeditions());

    this.expeditionList$
      .pipe(
        filter((articles) => articles.length > 0),
        first()
      )
      .subscribe((articles) => {
        const id: string = this.route.snapshot.params['id'];
        if (articles.some((article: Iexpediton) => article.id === id)) {
          this.store.dispatch(new SetSelectedExpedition(id));
        } else {
          this.router.navigate(['/404']);
        }
      });
  }

  sliderItems: Slide[] = [
    {
      id: 0,
      img: 'https://drive.google.com/uc?export=view&id=1KOmDG0mYK7oFhJXW611dE4EMPSsMuP27',
      date: 'Дата події',
      title: 'Назва експедиції1',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      id: 0,
      img: 'https://drive.google.com/uc?export=view&id=1JJF93dE4_1HofkG3z3XxiAXZmYm3isxn',
      date: 'Дата події',
      title: 'Назва експедиції2',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      id: 0,
      img: 'https://drive.google.com/uc?export=view&id=1Z2aE2YCQJBnf3EA8BpKEN3BJLiJ-Du46',
      date: 'Дата події',
      title: 'Назва експедиції3',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      id: 0,
      img: 'https://drive.google.com/uc?export=view&id=1S5DHNWuANY70a4IkXPZc620B6T0jO1Pz',
      date: 'Дата події',
      title: 'Назва експедиції4',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      id: 0,
      img: 'https://drive.google.com/uc?export=view&id=1JJF93dE4_1HofkG3z3XxiAXZmYm3isxn',
      date: 'Дата події',
      title: 'Назва експедиції5',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      id: 0,
      img: 'https://drive.google.com/uc?export=view&id=1S5DHNWuANY70a4IkXPZc620B6T0jO1Pz',
      date: 'Дата події',
      title: 'Назва експедиції6',
      description: 'Короткий опис',
      location: 'Локація'
    }
  ];

  getTranslation() {
    this.translateService.get('expeditions.article.latest-news').subscribe((translated: string) => {
      this.sliderTitle = translated;
    });
  }

  changeLanguage() {
    this.langChangeSubscription.unsubscribe();
  }
}
// @Select(NewsState.getSelectedArticle) selectedArticle$!: Observable<Article>;
// @Select(NewsState.getArticlesList) articles$!: Observable<Article[]>;
//
// constructor(
//   private store: Store,
//   private route: ActivatedRoute,
//   private router: Router
// ) {}
//
// ngOnInit(): void {
//   this.store.dispatch(new FetchArticles());
//
//   this.articles$
//     .pipe(
//       filter((articles) => articles.length > 0),
//       first()
//     )
//     .subscribe((articles) => {
//       const id: number = this.route.snapshot.params['id']
//       if (articles.some((article: Article) => +article.id === +id)) {
//         this.store.dispatch(new SetSelectedArticle(+id));
//       } else {
//         this.router.navigate(['/404']);
//       }
//     });
// }
