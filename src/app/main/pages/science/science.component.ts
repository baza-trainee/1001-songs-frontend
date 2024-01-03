import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from "@angular/router";

import { ArrowDownComponent } from 'src/app/main/pages/science/components/shared-components/arrow-down/arrow-down.component';
import { recomendations } from './components/shared-components/category-link/recomendations';
import { RecomendationComponent } from './components/shared-components/recomendation/recomendation.component';
import { RecommendedSourcesComponent } from './components/shared-components/recommended-sources/recommended-sources.component';
import { CategoryLinkComponent } from './components/shared-components/category-link/category-link.component';
import { ScienceCategory } from "../../../shared/interfaces/science.interface";
import { scienceCategories } from "../../../static-data/categoriesList";

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
  categories: ScienceCategory[] = scienceCategories;
  recomendations? = recomendations;
  recomendationPages: number[] = [1];
  expansionRecomendationArrow = 'bottom';
  expansionSourcesArrow = 'bottom';

  ngOnInit(): void {
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
