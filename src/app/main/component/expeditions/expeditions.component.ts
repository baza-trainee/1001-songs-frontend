import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ExpeditionsService, IExpediton } from 'src/app/shared/services/expeditions/expeditions.service';

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class ExpeditionsComponent {
  $expeditions: Observable<IExpediton[]>;
  categories: string[];
  selectedCategory: number = 0;
  validDate: Date = new Date();

  constructor(private expeditionsService: ExpeditionsService) {
    this.categories = this.expeditionsService.getCategories();
    this.$expeditions = this.expeditionsService.getExpeditions();
  }

  selectCategory(id: number) {
    this.selectedCategory = id;
  }

  getVideoUrl(url: string): string {
    const base = 'https://www.youtube.com/embed/';
    //const res = url.split('/');
    console.log(url);
    return url;
  }
}
