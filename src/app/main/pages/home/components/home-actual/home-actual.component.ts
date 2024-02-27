import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Slide} from "../../../../../shared/interfaces/slide.interface";
import {ProjectService} from "../../../../../shared/services/projects/project.service";
import {Subscription} from "rxjs";
import {SliderComponent} from "../../../../../shared/shared-components/slider/slider.component";

@Component({
  selector: 'app-home-actual',
  standalone: true,
  imports: [CommonModule, TranslateModule, SliderComponent],
  templateUrl: './home-actual.component.html',
  styleUrls: ['./home-actual.component.scss']
})
export class HomeActualComponent implements OnInit, OnDestroy {
  public projectsSlides: Slide[] = [];
  private projectsSubscription: Subscription | undefined;

  constructor(private _translate: TranslateService, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectsSubscription = this.projectService.fetchProjects().subscribe(projects => {
      this.projectsSlides = projects.items.map(project => this.projectService.convertToSlide(project));
    });
  }

  ngOnDestroy(): void {
    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }
  }
}
