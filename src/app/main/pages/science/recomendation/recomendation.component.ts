import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArrowDownComponent } from 'src/app/main/pages/science/arrow-down/arrow-down.component';
import { recomendations } from '../category-link/recomendations';

@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, ArrowDownComponent],
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.scss']
})
export class RecomendationComponent implements OnInit {
  private PAGE_SIZE = 5;
  expansionRecomendationArrow = 'bottom';
  recomendations? = recomendations;
  currentPage: number = 1;
  recomendationPages: number[] = [1];

  ngOnInit(): void {
    this.updateRecomendationsList();
  }

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
    const fullPages: number = Math.floor(recomendations!.length / this.PAGE_SIZE);
    const lastPage: number = recomendations.length % this.PAGE_SIZE > 0 ? 1 : 0;
    this.recomendationPages = Array.from(Array(fullPages + lastPage).keys()).map((el) => el + 1);

    const countFrom = this.PAGE_SIZE * (this.currentPage - 1);
    this.recomendations = recomendations.slice(countFrom, countFrom + this.PAGE_SIZE);
  }
}
