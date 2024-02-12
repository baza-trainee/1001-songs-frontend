import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';

import { ArrowDownComponent } from 'src/app/main/pages/science/components/shared-components/arrow-down/arrow-down.component';
import { recomendations } from './components/shared-components/category-link/recomendations';
import { RecomendationComponent } from './components/shared-components/recomendation/recomendation.component';
import { RecommendedSourcesComponent } from './components/shared-components/recommended-sources/recommended-sources.component';
import { CategoryLinkComponent } from './components/shared-components/category-link/category-link.component';
import { EducationCategoryCard, ScienceCategory } from '../../../shared/interfaces/science.interface';
import { scienceCategories } from '../../../static-data/categoriesList';
import { EducationService } from 'src/app/shared/services/education/education.service';

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
export class ScienceComponent implements OnInit {
  PAGE_SIZE = 5;
  categories: EducationCategoryCard[] = [];
  recomendations? = recomendations;
  recomendationPages: number[] = [1];
  expansionRecomendationArrow = 'bottom';
  expansionSourcesArrow = 'bottom';
  intro: string = '';

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.educationService.fetchESData().subscribe((data: object) => {
      const responseObject = data as { description: string; calendar_and_ritual_categories: [] };
      this.intro = responseObject.description;
      const genres = responseObject.calendar_and_ritual_categories;
      this.categories = genres.map((genreGroup: EducationCategoryCard) => ({
        title: genreGroup.title,
        id: genreGroup.id,
        media : genreGroup.media ? genreGroup.media: '/assets/songs.png'
      }));
      // console.log(genres);
    });

    this.recomendationPages = Array.from(
      Array(Math.floor(recomendations!.length / this.PAGE_SIZE) + (recomendations.length % this.PAGE_SIZE)).keys()
    ).map((el) => el + 1);
  }

  rotateRecomendationArrow() {
    this.expansionRecomendationArrow = this.expansionRecomendationArrow === 'bottom' ? 'top' : 'bottom';
  }
  rotateSourcesArrow() {
    this.expansionSourcesArrow = this.expansionSourcesArrow === 'bottom' ? 'top' : 'bottom';
  }
}
