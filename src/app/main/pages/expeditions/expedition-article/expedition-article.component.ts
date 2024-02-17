import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';

import { Expedition, ExpeditionArticle } from '../../../../shared/interfaces/expedition.interface';
import { VideoPlayerComponent } from '../../../../shared/shared-components/video-player/video-player.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { Slide } from 'src/app/shared/interfaces/slide.interface';
import { ShareComponent } from '../../../../shared/shared-components/share/share.component';
import { ExpeditionsService } from 'src/app/shared/services/expeditions/expeditions.service';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { BreadcrumbsComponent } from 'src/app/shared/shared-components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-expedition-article',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    VideoPlayerComponent,
    BreadcrumbsComponent,
    SliderComponent,
    ShareComponent,
    SafeHtmlPipe
  ],
  templateUrl: './expedition-article.component.html',
  styleUrls: ['./expedition-article.component.scss']
})
export class ExpeditionArticleComponent implements OnInit, OnDestroy {
  expeditionArticle: ExpeditionArticle = {} as ExpeditionArticle;

  sliderTitle!: string;
  linkedExpeditions: Expedition[] = [] as Expedition[];
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private expeditionSevice: ExpeditionsService
  ) {}

  ngOnInit(): void {
    const expeditionId = this.route.snapshot.params['id'];
    this.expeditionSevice
      .fetchExpeditionById(expeditionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const article = data as ExpeditionArticle;
        this.expeditionArticle = article;
        this.expeditionSevice
          .fetchExpeditionsListByParams({ search: '', id: article.category.id })
          .pipe(takeUntil(this.destroy$))
          .subscribe((responseObj) => {
            const responseData = responseObj as { items: [] };
            this.sliderItems = responseData.items.map((el) => this.sliderItemFromExpedition(el));
          });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }

  sliderItemFromExpedition(expedition: Expedition): Slide {
    return {
      id: expedition.id,
      img: expedition.preview_photo,
      date: expedition.expedition_date,
      title: expedition.title,
      description: expedition.short_description,
      location: expedition.location
    };
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
}
