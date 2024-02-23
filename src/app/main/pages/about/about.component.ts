import { CommonModule } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import {Observable, Subscription} from "rxjs";

import { AboutTeamComponent } from './about-team/about-team.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { AboutService } from "../../../shared/services/about/about.service";
import { AboutTeam, DataAboutContent } from "../../../shared/interfaces/about.interface";
import { FadeInCarouselComponent } from "../../../shared/shared-components/fade-in-carousel/fade-in-carousel.component";
import {SafeHtmlPipe} from "../../../shared/pipes/safe-html.pipe";
import {ProjectData} from "../../../shared/interfaces/project.interface";
import {Slide} from "../../../shared/interfaces/slide.interface";
import {ProjectService} from "../../../shared/services/projects/project.service";
import {ContentTextComponent} from "../../../shared/shared-components/content-text/content-text.component";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, AboutTeamComponent, SliderComponent, FadeInCarouselComponent, SafeHtmlPipe, ContentTextComponent]
})

export class AboutComponent implements OnInit, OnDestroy {
  readonly dataAboutContent$: Observable<DataAboutContent>;
  readonly projects$: Observable<ProjectData[]>;

  private subscriptions: Subscription[] = [];

  public aboutTeam$: Observable<AboutTeam[]>;
  public projectsSlides: Slide[] = [];


  constructor(
    private translateService: TranslateService,
    private aboutService: AboutService,
    private projectService: ProjectService
  ) {
    this.projects$ = this.projectService.fetchProjects();
    this.dataAboutContent$ = this.aboutService.fetchDataAboutContent();
    this.aboutTeam$ = this.aboutService.fetchAboutTeam();
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
