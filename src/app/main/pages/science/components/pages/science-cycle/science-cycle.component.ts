import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RecommendedSourcesComponent } from '../../shared-components/recommended-sources/recommended-sources.component';
import { BreadcrumbsComponent } from '../../../../../../shared/shared-components/breadcrumbs/breadcrumbs.component';
import { EducationPrimaryCategory, ScienceCategory } from '../../../../../../shared/interfaces/science.interface';
import { EducationService } from 'src/app/shared/services/education/education.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-science-cycle',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, RecommendedSourcesComponent, BreadcrumbsComponent],
  templateUrl: './science-cycle.component.html',
  styleUrls: ['./science-cycle.component.scss']
})
export class ScienceCycleComponent implements OnInit, OnDestroy {
  category!: ScienceCategory;
  categoryName!: string;
  categoryData: EducationPrimaryCategory = {} as EducationPrimaryCategory;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private educationService: EducationService
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.params['idCategory'];
    this.educationService
      .fetchCategoryById(categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: object) => {
        this.categoryData = data as EducationPrimaryCategory;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }
}
