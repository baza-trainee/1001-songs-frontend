import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArrowDownComponent } from 'src/app/main/pages/science/components/shared-components/arrow-down/arrow-down.component';

@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, ArrowDownComponent],
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.scss']
})
export class RecomendationComponent  {

  @Input() recommendations: string = 'This is recomendation';
  private PAGE_SIZE = 5;
  expansionRecomendationArrow = 'bottom';
  currentPage: number = 1;
  recomendationPages: number[] = [1];

  

  navigateToPage(specifiedPage: number) {
    this.currentPage = specifiedPage;
    this.updateRecomendationsList();
  }

  navigateToNextPage(pageNumber: number) {
    const nextPage = this.currentPage + pageNumber;
    if (this.recomendationPages.length < nextPage || nextPage < 1) {
      return;
    }
    this.currentPage = nextPage;
    this.updateRecomendationsList();
  }
  rotateRecomendationArrow() {
    this.expansionRecomendationArrow = this.expansionRecomendationArrow === 'bottom' ? 'top' : 'bottom';
  }

  updateRecomendationsList() {
  }
}
