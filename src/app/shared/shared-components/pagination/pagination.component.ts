import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalPages!: number;
  @Input() currentPage!: number;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
  goToNextPage(): void {
    const nextPage = this.currentPage < this.totalPages ? this.currentPage + 1 : this.totalPages;
    this.pageChange.emit(nextPage);
  }

  goToPrevPage(): void {
    const prevPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
    this.pageChange.emit(prevPage);
  }
}
