import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Select, Store } from '@ngxs/store';

import Iexpediton, { Expedition } from 'src/app/shared/interfaces/expedition.interface';
import { ExpeditionCardComponent } from 'src/app/shared/shared-components/expedition-card/expedition-card.component';
import { ExpeditionsState } from 'src/app/store/expeditions/expeditions.state';
import { expeditionCategories } from 'src/app/shared/enums/expeditionsCategories';
import { FetchExpeditions } from 'src/app/store/expeditions/expedition.actions';
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
  categories: expeditionCategories[] = Object.values(expeditionCategories);
  expeditionsList: Expedition[] = [];

  constructor(
    private store: Store,
    private expeditionsService: ExpeditionsService
  ) {
    this.store.dispatch(new FetchExpeditions());
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchExpeditions());
    this.expeditionsService.fetchExpeditionsList().subscribe((responseObj: object) => {
      const response = responseObj as { items: [] };
      this.expeditionsList = response.items;
      console.log(responseObj);
    });
  }

  filteredCategory(category: string): void {
    console.log(category);
  }
}
