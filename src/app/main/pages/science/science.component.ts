import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryLinkComponent } from './category-link/category-link.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArrowDownComponent } from 'src/app/main/pages/science/arrow-down/arrow-down.component';
import { scienceCategories } from './category-link/categoriesList';
import { recomendations } from './category-link/recomendations';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { RecommendedSourcesComponent } from './recommended-sources/recommended-sources.component';

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
    RecommendedSourcesComponent
  ]
})
export class ScienceComponent implements OnInit {
  categories: { translateKey: string; url: string }[] = scienceCategories;
  recomendations? = recomendations;
  recomendationPages: number[] = [1];
  expansionRecomendationArrow = 'bottom';
  expansionSourcesArrow = 'bottom';

  ngOnInit(): void {
    console.log(recomendations.length);
    this.recomendationPages = Array.from(Array(Math.floor(recomendations!.length / 5) + (recomendations.length % 5)).keys()).map(
      (el) => el + 1
    );
  }

  rotateRecomendationArrow() {
    this.expansionRecomendationArrow = this.expansionRecomendationArrow === 'bottom' ? 'top' : 'bottom';
  }
  rotateSourcesArrow() {
    this.expansionSourcesArrow = this.expansionSourcesArrow === 'bottom' ? 'top' : 'bottom';
  }
}
