import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { CategoryLinkComponent } from './category-link/category-link.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArrowDownComponent } from 'src/app/icons/arrow-down/arrow-down.component';
import { scienceCategories } from './category-link/categoriesList';
//import { scienceCategories } from 'src/app/shared/enums/scienceCategories';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, CategoryLinkComponent, MatExpansionModule, ArrowDownComponent]
})
export class ScienceComponent {
  categories: { translateKey: string; url: string }[] = scienceCategories;
  classDirection = 'bottom';

  changeDirection() {
    if (this.classDirection === 'bottom') {
      this.classDirection = 'top';
    } else {
      this.classDirection = 'bottom';
    }
  }
}
