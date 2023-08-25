import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ExpeditionsService, IExpediton } from 'src/app/shared/services/expeditions/expeditions.service';
import { SafeMediaUrlPipe } from "../../../shared/pipes/safe-media-url.pipe";
import { ExpeditionCardComponent } from 'src/app/shared/shared-components/expedition-card/expedition-card.component';

@Component({
    selector: 'app-expeditions',
    templateUrl: './expeditions.component.html',
    styleUrls: ['./expeditions.component.scss'],
    standalone: true,
    imports: [CommonModule, TranslateModule, SafeMediaUrlPipe, ExpeditionCardComponent]
})
export class ExpeditionsComponent {
  $expeditions: Observable<IExpediton[]>;
  categories: string[];
  selectedCategory: number = 0;

  constructor(private expeditionsService: ExpeditionsService) {
    this.categories = this.expeditionsService.getCategories();
    this.$expeditions = this.expeditionsService.getExpeditions();
  }

  selectCategory(id: number) {
    this.selectedCategory = id;
  }

}
