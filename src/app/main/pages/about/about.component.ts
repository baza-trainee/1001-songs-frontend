import { CommonModule } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import {Observable, Subscription} from "rxjs";

import { AboutTeamComponent } from './about-team/about-team.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { AboutService } from "../../../shared/services/about/about.service";
import { FormattingTextService } from "../../../shared/services/formatting-text/formating-text.service";
import { AboutTeam, Content, DataAboutContent } from "../../../shared/interfaces/about.interface";
import { FadeInCarouselComponent } from "../../../shared/shared-components/fade-in-carousel/fade-in-carousel.component";
import {SafeHtmlPipe} from "../../../shared/pipes/safe-html.pipe";
import {ProjectData} from "../../../shared/interfaces/project.interface";
import {Slide} from "../../../shared/interfaces/slide.interface";
import {ProjectService} from "../../../shared/services/projects/project.service";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, AboutTeamComponent, SliderComponent, FadeInCarouselComponent, SafeHtmlPipe]
})

export class AboutComponent implements OnInit, OnDestroy {
  readonly dataAboutContent$: Observable<DataAboutContent>;
  readonly projects$: Observable<ProjectData[]>;

  private subscriptions: Subscription[] = [];

  public aboutTeam$: Observable<AboutTeam[]>;
  public content!: Content[];
  public projectsSlides!: Slide[];


  constructor(
    private translateService: TranslateService,
    private aboutService: AboutService,
    private formattingTextService: FormattingTextService,
    private projectService: ProjectService
  ) {
    this.projects$ = this.projectService.fetchProjects();
    this.dataAboutContent$ = this.aboutService.fetchDataAboutContent();
    this.aboutTeam$ = this.aboutService.fetchAboutTeam();
    this.subscriptions.push(this.dataAboutContent$.subscribe(content => {
      this.content = this.formattingTextService.splitText(content.content);
    }));
  }

  ngOnInit(): void {
    this.subscriptions.push(this.projects$.subscribe(projects => {
      this.projectsSlides = projects.map(project => this.projectService.convertToSlide(project));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
