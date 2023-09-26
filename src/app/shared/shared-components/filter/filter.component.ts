import {Component, DestroyRef, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgFor} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

import {Article} from "../../../main/pages/news/article.interface";
import {ArticlesService} from "../../../main/pages/news/services/articles.service";


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgFor],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() categories: string[] = [];
  public selectedFilter: string = 'Усі';
  private filteredArticle!: Article[];
  private articles!: Article[];
  public startX: number = 0;
  public currentX: number = 0;
  public translateX: number = 0;
  private maxSlide: number = 0;
  private isDragging!: boolean;

  private readonly articleService = inject(ArticlesService);
  private readonly destroyRef = inject(DestroyRef);

  @Output() filteredArticles = new EventEmitter<Article[]>();
  @ViewChild('slide', {read: ElementRef}) slide!: ElementRef;

  ngOnInit(): void {
    this.articleService
      .getArticles()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((articles) => (this.articles = articles));
  }

  filterArticles(category: string) {
    if (category) {
      this.selectedFilter = category;

      if (category === 'Усі') {
        this.filteredArticle = this.articles;
        this.filteredArticles.emit(this.filteredArticle);
      } else {
        this.filteredArticle = this.articles.filter((article) => article.category === category);
        this.filteredArticles.emit(this.filteredArticle);
      }
    }
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
