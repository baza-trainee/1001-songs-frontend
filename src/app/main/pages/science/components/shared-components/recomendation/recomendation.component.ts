import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArrowDownComponent } from 'src/app/main/pages/science/components/shared-components/arrow-down/arrow-down.component';
import { AMOUNT_OF_RECOMENDATIONS_PAGE as size } from 'src/app/shared/config/pagination.constatnts';
import { FormattingTextService } from 'src/app/shared/services/formatting-text/formating-text.service';
import { Content } from 'src/app/shared/interfaces/about.interface';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, ArrowDownComponent, SafeHtmlPipe],
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.scss']
})
export class RecomendationComponent implements OnChanges {
  @Input() recommendations: string = 'This is recomendation';
  expansionRecomendationArrow = 'bottom';
  currentPage: number = 1;
  totalParagraphs: Content[] = [];
  pageParagraphs: Content[] = [];
  recomendationPages: number[] = [1];

  constructor(private format: FormattingTextService) {}

  ngOnChanges(): void {
    this.totalParagraphs = this.format.splitText(this.recommendations); //.filter(el => this.format.checkEmptyElement(el.text));
    this.totalParagraphs.pop();
    this.totalParagraphs.shift();
    const pages = Math.ceil(this.totalParagraphs.length / size);
    this.recomendationPages = Array.from(Array(pages).keys()).map((el) => el + 1);
    this.setPageContent();
  }

  setPageContent() {
    this.pageParagraphs = this.totalParagraphs.slice((this.currentPage - 1) * size, this.currentPage * size);
  }

  navigateToPage(selectedPage: number) {
    this.currentPage = selectedPage;
    this.setPageContent();
  }

  navigateToNextPage(pageNumber: number) {
    const nextPage = this.currentPage + pageNumber;
    if (this.recomendationPages.length < nextPage || nextPage < 1) {
      return;
    }
    this.currentPage = nextPage;
    this.setPageContent();
  }
  rotateRecomendationArrow() {
    this.expansionRecomendationArrow = this.expansionRecomendationArrow === 'bottom' ? 'top' : 'bottom';
  }
}
