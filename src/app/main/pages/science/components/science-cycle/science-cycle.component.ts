import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {scienceCategories} from "../category-link/categoriesList";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {take} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";

import {RecommendedSourcesComponent} from "../recommended-sources/recommended-sources.component";
import {mockScienceCycle} from "../../../../../mock-data/science-cycle";
import {ScienceCategory} from "../../../../../shared/interfaces/science.interface";
import {BreadcrumbsComponent} from "../../../../../shared/shared-components/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-science-cycle',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, RecommendedSourcesComponent, BreadcrumbsComponent],
  templateUrl: './science-cycle.component.html',
  styleUrls: ['./science-cycle.component.scss']
})
export class ScienceCycleComponent implements OnInit {
  category: ScienceCategory = mockScienceCycle;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.checkAndSetSelectedCategory();
  }

  private checkAndSetSelectedCategory() {
    if (this.route.params) {
      this.route.params.pipe(take(1)).subscribe(params => {
        const categories: { translateKey: string; url: string; routerLink: string }[] = scienceCategories;
        const requestedRouterLink = params['category'];
        const selectedCategory = categories.find(category => category.routerLink === requestedRouterLink);

        if (selectedCategory) {
          this.category.title = selectedCategory.translateKey;
          this.category.subcategories[0].urlImg = selectedCategory.url;
        } else {
          this.router.navigate(['/404']);
        }
      });
    }
  }


}
