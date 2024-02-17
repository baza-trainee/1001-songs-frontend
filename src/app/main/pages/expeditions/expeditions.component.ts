import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Select, Store } from '@ngxs/store';

import Iexpediton, { Expedition } from 'src/app/shared/interfaces/expedition.interface';
import { ExpeditionCardComponent } from 'src/app/main/pages/expeditions/expedition-card/expedition-card.component';
import { ExpeditionsState } from 'src/app/store/expeditions/expeditions.state';
import { FilterComponent } from '../../../shared/shared-components/filter/filter.component';
import { ExpeditionsService } from 'src/app/shared/services/expeditions/expeditions.service';

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, ExpeditionCardComponent, HttpClientModule, FilterComponent]
})
export class ExpeditionsComponent implements OnInit {
  @Select(ExpeditionsState.getExpeditionsList) expeditions$?: Observable<Iexpediton[]>;
  expeditionCategories: { id: number; title: string }[] = [{ id: 0, title: 'string' }];
  categories = ['Усі'];

  expeditionsList: Expedition[] = [];

  constructor(
    private store: Store,
    private expeditionsService: ExpeditionsService
  ) {}

  ngOnInit(): void {
    this.getExpeditionsList(-1);
    this.getExpeditionCategories();
  }

  filteredCategory(categoryTitle: string): void {
    const category = this.expeditionCategories.find((el) => el.title === categoryTitle);
    this.getExpeditionsList(category ? category.id : -1);
  }

  getExpeditionsList(categoryId: number) {
    const Id: number = categoryId;
    const params = { search: '', id: categoryId };
    this.expeditionsService.fetchExpeditionsListByParams(params).subscribe((responseObj: object) => {
      console.log(responseObj);
      const response = responseObj as { items: [] };
      this.expeditionsList = response.items;
    });
  }

  getExpeditionCategories() {
    this.expeditionsService.fetchExpeditionCategories().subscribe((responseArray) => {
      const list = responseArray as { id: number; title: string }[];
      this.expeditionCategories = list;
      this.categories = [...this.categories, ...list.map((el: { title: string }) => el.title)];
    });
  }
}
