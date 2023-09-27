import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { CategoryLinkComponent } from './category-link/category-link.component';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, CategoryLinkComponent]
})
export class ScienceComponent {
  categories$: Observable<string[]> = of(['Пісні зимового циклу', 'Масляна, Колодій']);
}
