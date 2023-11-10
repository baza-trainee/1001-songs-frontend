import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {take} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";

import {RecommendedSourcesComponent} from "../../shared-components/recommended-sources/recommended-sources.component";
import {BreadcrumbsComponent} from "../../../../../../shared/shared-components/breadcrumbs/breadcrumbs.component";
import {ScienceCategory} from "../../../../../../shared/interfaces/science.interface";
import {scienceCategories} from "../../shared-components/category-link/categoriesList";

@Component({
  selector: 'app-science-cycle',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, RecommendedSourcesComponent, BreadcrumbsComponent],
  templateUrl: './science-cycle.component.html',
  styleUrls: ['./science-cycle.component.scss']
})
export class ScienceCycleComponent implements OnInit {
  category!: ScienceCategory;
  categoryName!: string;
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
        const categories: ScienceCategory[] = scienceCategories;
        this.categoryName = params['category'];
        const selectedCategory = categories.find(category => category.routerLink === this.categoryName);
        if (selectedCategory) {
          this.category = selectedCategory;
        } else {
          this.router.navigate(['/404']);
        }
      });
    }
  }


}
