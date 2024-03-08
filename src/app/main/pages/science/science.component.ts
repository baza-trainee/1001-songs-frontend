import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';

import { ArrowDownComponent } from 'src/app/main/pages/science/components/shared-components/arrow-down/arrow-down.component';
import { RecomendationComponent } from './components/shared-components/recomendation/recomendation.component';
import { RecommendedSourcesComponent } from './components/shared-components/recommended-sources/recommended-sources.component';
import { CategoryLinkComponent } from './components/shared-components/category-link/category-link.component';
import { EducationCategoryCard } from '../../../shared/interfaces/science.interface';
import { EducationService } from 'src/app/shared/services/education/education.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CategoryLinkComponent,
    MatExpansionModule,
    ArrowDownComponent,
    RecomendationComponent,
    RecommendedSourcesComponent,
    RouterLink
  ]
})
export class ScienceComponent implements OnInit, OnDestroy {
  categories: EducationCategoryCard[] = [];
  recommendations = '';
  recommendedSources: string = '';
  expansionRecommendationArrow = 'bottom';
  expansionSourcesArrow = 'bottom';
  intro: string = '';
  title: string = '';

  destroy$: Subject<void> = new Subject<void>();

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.educationService
      .fetchESData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((responseObject: object) => {
        const data = responseObject as {
          title: string;
          description: string;
          calendar_and_ritual_categories: [];
          recommendations: string;
          recommended_sources: string;
        };
        this.title = data.title;
        this.intro = data.description;
        this.recommendations = data.recommendations;
        this.recommendedSources = data.recommended_sources;
        const genres = data.calendar_and_ritual_categories;
        this.categories = genres.map((genreGroup: EducationCategoryCard) => ({
          title: genreGroup.title,
          id: genreGroup.id,
          media: genreGroup.media ? genreGroup.media : '/assets/songs.png'
        }));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }

  rotateRecommendationArrow() {
    this.expansionRecommendationArrow = this.expansionRecommendationArrow === 'bottom' ? 'top' : 'bottom';
  }

  rotateSourcesArrow() {
    this.expansionSourcesArrow = this.expansionSourcesArrow === 'bottom' ? 'top' : 'bottom';
  }
}
