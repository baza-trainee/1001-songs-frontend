import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import {Subject, Subscription, takeUntil} from 'rxjs';

import { Expedition, ExpeditionArticle } from '../../../../shared/interfaces/expedition.interface';
import { VideoPlayerComponent } from '../../../../shared/shared-components/video-player/video-player.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { Slide } from 'src/app/shared/interfaces/slide.interface';
import { ShareComponent } from '../../../../shared/shared-components/share/share.component';
import { ExpeditionsService } from 'src/app/shared/services/expeditions/expeditions.service';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { BreadcrumbsComponent } from 'src/app/shared/shared-components/breadcrumbs/breadcrumbs.component';
import {Content} from "../../../../shared/interfaces/about.interface";
import {FormattingTextService} from "../../../../shared/services/formatting-text/formating-text.service";
import {
    FadeInCarouselComponent
} from "../../../../shared/shared-components/fade-in-carousel/fade-in-carousel.component";

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
        SafeHtmlPipe,
        FadeInCarouselComponent
    ],
  templateUrl: './expedition-article.component.html',
  styleUrls: ['./expedition-article.component.scss']
})
export class ExpeditionArticleComponent implements OnInit, OnDestroy {
  expeditionArticle: ExpeditionArticle = {} as ExpeditionArticle;
  content!: Content[];
  sliderItems: Slide[] = [];
  destroy$: Subject<void> = new Subject<void>();
  private subscriptions: Subscription[] = [];


  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private expeditionSevice: ExpeditionsService,
    private formattingTextService: FormattingTextService
  ) {
      this.content = this.formattingTextService.splitText(this.expeditionArticle.content);
  }

  ngOnInit(): void {
    if (this.route.params) {
      this.subscriptions.push(
          this.route.params.subscribe(params => {
            const expeditionId = params['id'];
            this.expeditionSevice
                .fetchExpeditionById(expeditionId)
                .pipe(takeUntil(this.destroy$))
                .subscribe((data) => {
                  const article = data as ExpeditionArticle;
                  this.expeditionArticle = article;
                  this.expeditionSevice
                      .fetchExpeditionsListByParams({ search: '', id: article.category.id, exclude: article.id })
                      .pipe(takeUntil(this.destroy$))
                      .subscribe((responseObj) => {
                        const responseData = responseObj as { items: [] };
                        this.sliderItems = responseData.items.map((el) => this.sliderItemFromExpedition(el));
                      });
                });
          }));
    }
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
}
