import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Observable, Subscription } from "rxjs";

import { AboutTeamComponent } from './about-team/about-team.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { AboutService } from "../../../shared/services/about/about.service";
import { AboutTeam, DataAboutContent } from "../../../shared/interfaces/about.interface";
import { FadeInCarouselComponent } from "../../../shared/shared-components/fade-in-carousel/fade-in-carousel.component";
import { SafeHtmlPipe } from "../../../shared/pipes/safe-html.pipe";
import { Slide } from "../../../shared/interfaces/slide.interface";
import { ProjectService } from "../../../shared/services/projects/project.service";
import { ContentTextComponent } from "../../../shared/shared-components/content-text/content-text.component";
import {AboutSliderComponent} from "./about-slider/about-slider.component";
import {ProjectItem} from "../../../shared/interfaces/project.interface";
import {Router, RouterLink} from "@angular/router";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, AboutTeamComponent, SliderComponent, FadeInCarouselComponent, SafeHtmlPipe, ContentTextComponent, AboutSliderComponent, RouterLink]
})

export class AboutComponent implements OnInit, OnDestroy {
  readonly dataAboutContent$: Observable<DataAboutContent>;
  private subscriptions: Subscription[] = [];

  public aboutTeam$: Observable<AboutTeam[]>;
  public projectsSlides: Slide[] = [];
  public projectsSlidesDesktop: ProjectItem[] = [];

  constructor(
    private translateService: TranslateService,
    private aboutService: AboutService,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.dataAboutContent$ = this.aboutService.fetchDataAboutContent();
    this.aboutTeam$ = this.aboutService.fetchAboutTeam();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.projectService.fetchProjects().subscribe(projects => {
      if (projects.items) {
        this.projectsSlidesDesktop = projects.items.slice(0, 7);
        this.projectsSlides = projects.items.map(project => this.projectService.convertToSlide(project));
      }
    }));
  }

  navigateTo(id: number) {
    this.router.navigate(['project/' + id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
