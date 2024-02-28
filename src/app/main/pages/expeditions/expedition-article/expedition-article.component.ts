import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Subscription, switchMap} from 'rxjs';

import {Expedition, ExpeditionArticle} from '../../../../shared/interfaces/expedition.interface';
import { VideoPlayerComponent } from '../../../../shared/shared-components/video-player/video-player.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { Slide } from 'src/app/shared/interfaces/slide.interface';
import { ShareComponent } from '../../../../shared/shared-components/share/share.component';
import { ExpeditionsService } from 'src/app/shared/services/expeditions/expeditions.service';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { BreadcrumbsComponent } from 'src/app/shared/shared-components/breadcrumbs/breadcrumbs.component';
import {
    FadeInCarouselComponent
} from "../../../../shared/shared-components/fade-in-carousel/fade-in-carousel.component";
import { SliderService } from "../../../../shared/services/slider/slider.service";
import {ContentTextComponent} from "../../../../shared/shared-components/content-text/content-text.component";
import {Breadcrumbs} from "../../../../shared/interfaces/breadcrumbs.interface";
import {ExpeditionCardComponent} from "../expedition-card/expedition-card.component";

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
    FadeInCarouselComponent,
    ContentTextComponent,
    ExpeditionCardComponent
  ],
  templateUrl: './expedition-article.component.html',
  styleUrls: ['./expedition-article.component.scss']
})

export class ExpeditionArticleComponent implements OnInit, OnDestroy {
    public expeditionArticle!: ExpeditionArticle;
    public sliderItems: Slide[] = [];
    public sliderItemsDesktop!: Expedition[];
    private readonly subscriptions: Subscription[] = [];
    breadcrumbs: Breadcrumbs[] = [{path: 'expeditions', name: 'Експедиції'}];

    constructor(
        private route: ActivatedRoute,
        private expeditionService: ExpeditionsService,
        private sliderService: SliderService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.fetchData();
    }

    private fetchData(): void {
        if (!this.route.params) return;

        this.subscriptions.push(
            this.route.params.pipe(
                switchMap(({id}) => {
                    return this.expeditionService.fetchData(id)
                }))
                .subscribe(({content, sliderItem}) => {
                  this.expeditionArticle = content;
                  this.sliderItemsDesktop = sliderItem.items.slice(0, 4);
                  this.sliderItems = this.sliderService.sliderItemFromExpedition(sliderItem.items);
                })
        );
    }

    navigateTo(id: number) {
      this.router.navigate([ '/expeditions/' + id]);
    }


  ngOnDestroy(): void {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
