import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectService} from "../../../shared/services/projects/project.service";
import {Project, ProjectItem} from "../../../shared/interfaces/project.interface";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareComponent} from "../../../shared/shared-components/share/share.component";
import {TranslateModule} from "@ngx-translate/core";
import {SafeHtmlPipe} from "../../../shared/pipes/safe-html.pipe";
import {SliderComponent} from "../../../shared/shared-components/slider/slider.component";
import {Slide} from "../../../shared/interfaces/slide.interface";
import {ContentTextComponent} from "../../../shared/shared-components/content-text/content-text.component";
import {MatCardModule} from "@angular/material/card";
import {AboutSliderComponent} from "../about/about-slider/about-slider.component";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ShareComponent, TranslateModule, SafeHtmlPipe, SliderComponent, ContentTextComponent, MatCardModule, AboutSliderComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit, OnDestroy {
  public project$!: Observable<Project>;
  public projectsSlides!: Slide[];
  public projectsSlidesDesktop!: ProjectItem[];
  private subscriptions: Subscription[] = [];

  constructor(
      private projectService: ProjectService,
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeToRouteParams();

  }

  private subscribeToRouteParams(): void {
    if (this.route.params) {
      this.subscriptions.push(this.route.params.subscribe(params => {
        this.project$ = this.projectService.fetchProjectById(params['id']);
        this.fetchSliderItems(params['id']);
      }));
    }
  }

  navigateTo(id: number) {
    this.router.navigate(['project/' + id]);
  }

  private fetchSliderItems(id: string): void {
    this.subscriptions.push(this.projectService.fetchProjects({project_exclude: id}).subscribe(projects => {
      this.projectsSlidesDesktop = projects.items.slice();
      this.projectsSlides = projects.items.map(project => this.projectService.convertToSlide(project));
    }));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
