import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryLinkComponent } from './components/category-link/category-link.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArrowDownComponent } from 'src/app/main/pages/science/components/arrow-down/arrow-down.component';
import { scienceCategories } from './components/category-link/categoriesList';
import { recomendations } from './components/category-link/recomendations';
import { RecomendationComponent } from './components/recomendation/recomendation.component';
import { RecommendedSourcesComponent } from './components/recommended-sources/recommended-sources.component';
import {RouterLink} from "@angular/router";

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
  categories: { translateKey: string; url: string; routerLink: string }[] = scienceCategories;
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
