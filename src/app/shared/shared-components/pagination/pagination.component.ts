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
  maxVisiblePages: number = 4
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
  
  goToNextPage(): void {
    if (this.pages.length === this.currentPage) return;
    const nextPage = this.currentPage < this.totalPages ? this.currentPage + 1 : this.totalPages;
    this.pageChange.emit(nextPage);
  }

  goToPrevPage(): void {
    if (this.currentPage === 1) return;
    const prevPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
    this.pageChange.emit(prevPage);
  }

  getPagesToShow(): number[] {
    const pages: number[] = [];

    if (this.totalPages <= this.maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = this.currentPage <= 2 ? 1 : this.currentPage - 1;
      const endPage = this.currentPage >= this.totalPages - 1 ? this.totalPages : this.currentPage + 1;

      if (startPage > 1) pages.push(0);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < this.totalPages) pages.push(0);
    }

    return pages;
  }


}


