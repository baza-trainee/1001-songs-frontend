import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {KeyValuePipe, NgFor} from '@angular/common';

import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgFor, TranslateModule, KeyValuePipe],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() categories: string[] = [];
  public selectedFilterIndex: number = 0;
  public startX: number = 0;
  public currentX: number = 0;
  public translateX: number = 0;
  private maxSlide: number = 0;
  private isDragging!: boolean;

  @Output() filteredArticles = new EventEmitter<string>();
  @ViewChild('slide', {read: ElementRef}) slide!: ElementRef;


  filterArticles(index: number, category: string) {
    if (index >= 0) this.selectedFilterIndex = index;
    const nameCategory = category.split('.');
    this.filteredArticles.emit(nameCategory.pop()!);
  }

  // slider for string
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.currentX = this.startX;
    this.maxSlide = this.slide.nativeElement.offsetWidth - window.innerWidth + (this.slide.nativeElement.offsetLeft * 2);
    this.isDragging = true;
  }

  onTouchMove(event: TouchEvent): void {
    if (this.isDragging && window.outerWidth <= 880) {
      const touch = event.touches[0];
      const diffX = touch.clientX - this.currentX;
      this.translateX += diffX;

      if (this.translateX > 0) {
        this.translateX = 0;
      }

      if (this.maxSlide - Math.abs(this.translateX) < 0) {
        this.translateX = -this.maxSlide;
      }

      this.currentX = touch.clientX;
    }
  }

  onTouchEnd(): void {
    this.isDragging = false;
  }
}
