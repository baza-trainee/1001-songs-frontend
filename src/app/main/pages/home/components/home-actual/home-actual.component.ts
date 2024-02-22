import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Slide} from "../../../../../shared/interfaces/slide.interface";
import {ProjectService} from "../../../../../shared/services/projects/project.service";
import {Observable, Subscription} from "rxjs";
import {SliderComponent} from "../../../../../shared/shared-components/slider/slider.component";
import {ProjectData} from "../../../../../shared/interfaces/project.interface";

@Component({
  selector: 'app-home-actual',
  standalone: true,
  imports: [CommonModule, TranslateModule, SliderComponent],
  templateUrl: './home-actual.component.html',
  styleUrls: ['./home-actual.component.scss']
})
export class HomeActualComponent implements OnInit, OnDestroy {
  private readonly projects$: Observable<ProjectData[]>;
  public projectsSlides: Slide[] = [];
  private projectsSubscription: Subscription | undefined;

  constructor(private _translate: TranslateService, private projectService: ProjectService) {
    this.projects$ = this.projectService.fetchProjects();
  }

  ngOnInit(): void {
    if(this.projects$) {
      this.projectsSubscription = this.projects$.subscribe(projects => {
        this.projectsSlides = projects.map(project => this.projectService.convertToSlide(project));
      });
    }
  }

  ngOnDestroy(): void {
    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }
  }
}
