import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';

import { Article } from '../../article.interface';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgFor],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  public readonly categories: string[] = ['Усі', 'Зустрічі', 'Лекції', 'Публікації', 'Майстер-класи', 'Концерти', 'Коференції'];

  public selectedFilter: string = 'Усі';
  private filteredArticle!: Article[];
  private articles!: Article[];
  private unSub!: Subscription;
  public startX: number = 0;
  public currentX: number = 0;
  public translateX: number = 0;
  private maxSlide: number = 0;

  @Output() filteredArticles = new EventEmitter<Article[]>();
  @ViewChild('slide', { read: ElementRef }) slide!: ElementRef;

  constructor(private articleService: ArticlesService) {}

  ngOnInit(): void {
    this.unSub = this.articleService.getArticles().subscribe((articles) => (this.articles = articles));
  }

  filterArticles(category: string) {
    if (category) {
      this.selectedFilter = category;

      if (category === 'Усі') {
        this.filteredArticle = this.articles.slice(0, 3);
        this.filteredArticles.emit(this.filteredArticle);
      } else {
        this.filteredArticle = this.articles.filter((article) => article.category === category).slice(0, 3);
        this.filteredArticles.emit(this.filteredArticle);
      }
    }
  }
  // slider for string
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.currentX = this.startX;
    this.maxSlide = this.slide.nativeElement.offsetWidth;
  }

  onTouchMove(event: TouchEvent): void {
    if (window.outerWidth <= 768) {
      const touch = event.touches[0];
      const diffX = touch.clientX - this.currentX;
      if (this.translateX > 0) {
        this.translateX = 0;
      }

      if (this.maxSlide - Math.abs(this.translateX) < 0) {
        this.translateX = -this.maxSlide;
      } else {
        this.translateX += diffX;
        this.currentX = touch.clientX;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }
}
