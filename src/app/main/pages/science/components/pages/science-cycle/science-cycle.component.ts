import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RecommendedSourcesComponent } from '../../shared-components/recommended-sources/recommended-sources.component';
import { BreadcrumbsComponent } from '../../../../../../shared/shared-components/breadcrumbs/breadcrumbs.component';
import { ScienceCategory, SongsPrimaryCategory } from '../../../../../../shared/interfaces/science.interface';
import { EducationService } from 'src/app/shared/services/education/education.service';

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
  songsCycle: SongsPrimaryCategory = {
    id: 0,
    title: 'string',
    description: 'string',
    photo1: 'string',
    photo2: 'string',
    photo3: 'string',
    photo4: 'string',
    photo5: 'string'
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private educationService: EducationService
  ) {}

  ngOnInit(): void {
    //  this.checkAndSetSelectedCategory();

    const categoryId = this.route.snapshot.params['category'];
    this.educationService.fetchCategoryById(categoryId);

    //console.log(' > > > ', d);
    // const currentCycle = this.route.snapshot.params['category'];
    // const cycle = genreCycles[currentCycle as keyof typeof genreCycles];
    // this.educationService.fetchESData().subscribe((d: any) => {
    //   const data = d.find((el: any) => el.title === cycle);
    //   console.log(data);
    //   this.songsCycle = data;
    // });
  }

  // private checkAndSetSelectedCategory() {
  //   if (this.route.params) {
  //     this.route.params.pipe(take(1)).subscribe((params) => {
  //       const categories: ScienceCategory[] = scienceCategories;
  //       this.categoryName = params['category'];
  //       const selectedCategory = categories.find((category) => category.routerLink === this.categoryName);
  //       if (selectedCategory) {
  //         this.category = selectedCategory;
  //       } else {
  //         this.router.navigate(['/404']);
  //       }
  //     });
  //   }
  // }
}
