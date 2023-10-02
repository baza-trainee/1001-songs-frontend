import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryLinkComponent } from './category-link/category-link.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArrowDownComponent } from 'src/app/icons/arrow-down/arrow-down.component';
import { scienceCategories } from './category-link/categoriesList';
import { recomendations } from './category-link/recomendations';
import { NavigationNextComponent } from 'src/app/icons/navigation-next/navigation-next.component';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, CategoryLinkComponent, MatExpansionModule, ArrowDownComponent, NavigationNextComponent]
})
export class ScienceComponent implements OnInit {
  categories: { translateKey: string; url: string }[] = scienceCategories;
  recomendations = recomendations;
  expansionRecomendationArrow = 'bottom';
  expansionSourcesArrow = 'bottom';

  ngOnInit(): void {
    console.log(recomendations.length);
  }

  rotateRecomendationArrow() {
    this.expansionRecomendationArrow = this.expansionRecomendationArrow === 'bottom' ? 'top' : 'bottom';
  }
  rotateSourcesArrow() {
    this.expansionSourcesArrow = this.expansionSourcesArrow === 'bottom' ? 'top' : 'bottom';
  }
}
