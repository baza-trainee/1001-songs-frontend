import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Select, Store } from '@ngxs/store';

import Iexpediton, { Expedition } from 'src/app/shared/interfaces/expedition.interface';
import { ExpeditionCardComponent } from 'src/app/main/pages/expeditions/expedition-card/expedition-card.component';
import { ExpeditionsState } from 'src/app/store/expeditions/expeditions.state';
import { expeditionCategories } from 'src/app/shared/enums/expeditionsCategories';
import { FilterComponent } from '../../../shared/shared-components/filter/filter.component';
import { ExpeditionsService } from 'src/app/shared/services/expeditions/expeditions.service';
import { expeditionsCategories } from 'src/app/shared/enums/expeditionsCategories';

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, ExpeditionCardComponent, HttpClientModule, FilterComponent]
})
export class ExpeditionsComponent implements OnInit {
  @Select(ExpeditionsState.getExpeditionsList) expeditions$?: Observable<Iexpediton[]>;
  categories: expeditionCategories[] = Object.values(expeditionCategories);
  expeditionsList: Expedition[] = [];

  constructor(
    private store: Store,
    private expeditionsService: ExpeditionsService
  ) {}

  ngOnInit(): void {
    this.getExpeditionsList('');
  }

  filteredCategory(category: string): void {
    this.getExpeditionsList(category);
  }

  getExpeditionsList(category: string) {
    const categoryId = this.getCategoryIdByName(category);
    const params = { search: '', id: Number.parseInt(categoryId) };
    this.expeditionsService.fetchExpeditionsListByParams(params).subscribe((responseObj: object) => {
      const response = responseObj as { items: [] };
      this.expeditionsList = response.items;
    });
  }
  getCategoryIdByName(name: string) {
    const target = Object.entries(expeditionsCategories).find((el) => el[0] === name);
    return target ? target[1] + '' : '';
  }
}
