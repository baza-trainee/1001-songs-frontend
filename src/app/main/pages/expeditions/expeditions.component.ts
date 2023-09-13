import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ExpeditionsService } from 'src/app/shared/services/expeditions/expeditions.service';
import { SafeMediaUrlPipe } from '../../../shared/pipes/safe-media-url.pipe';
import { ExpeditionCardComponent } from 'src/app/shared/shared-components/expedition-card/expedition-card.component';
import Iexpediton from 'src/app/shared/interfaces/expedition.interface';
import {  HttpClientModule } from '@angular/common/http';
import { Select, Store } from '@ngxs/store';
import { ExpeditionsState } from 'src/app/store/expeditions.state';

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, SafeMediaUrlPipe, ExpeditionCardComponent, HttpClientModule]
})
export class ExpeditionsComponent {
  @Select(ExpeditionsState.getExpeditionsList) expeditions$?:Observable<Iexpediton[]>
//  $expeditions: Observable<Iexpediton[]>;
  categories: string[];
  selectedCategory: number = 0;

  constructor(private expeditionsService: ExpeditionsService, private store: Store) {
    this.categories = this.expeditionsService.getCategories();
   // this.$expeditions = this.expeditionsService.getExpeditions();
  }

  selectCategory(id: number) {
    this.selectedCategory = id;
  }
}
