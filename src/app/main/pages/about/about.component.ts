import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import {Observable, Subscription} from "rxjs";

import { AboutTeamComponent } from './about-team/about-team.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { AboutService } from "../../../shared/services/about/about.service";
import { FormattingTextService } from "../../../shared/services/formatting-text/formating-text.service";
import { AboutTeam, Content, DataAboutContent } from "../../../shared/interfaces/about.interface";
import { FadeInCarouselComponent } from "../../../shared/shared-components/fade-in-carousel/fade-in-carousel.component";
import {SafeHtmlPipe} from "../../../shared/pipes/safe-html.pipe";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, AboutTeamComponent, SliderComponent, FadeInCarouselComponent, SafeHtmlPipe]
})

export class AboutComponent implements OnDestroy {
  private dataAboutContent$: Observable<DataAboutContent>;
  public aboutTeam$: Observable<AboutTeam[]>;
  public content!: Content;
  private subscription$: Subscription;

  constructor(
    private translateService: TranslateService,
    private aboutService: AboutService,
    private formattingTextService: FormattingTextService,
  ) {
    this.dataAboutContent$ = this.aboutService.fetchDataAboutContent();
    this.aboutTeam$ = this.aboutService.fetchAboutTeam();
    this.subscription$ = this.dataAboutContent$.subscribe(content => {
      this.content = this.formattingTextService.splitText(content.content);
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
