import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, tap } from 'rxjs';

import { Article } from '../../article.interface';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
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

  @Output() filteredArticles = new EventEmitter<Article[]>();

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

  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.currentX = this.startX;
  }

  onTouchMove(event: TouchEvent): void {
    const touch = event.touches[0];
    const diffX = touch.clientX - this.currentX;
    this.translateX += diffX;
    this.currentX = touch.clientX;
    const target = event.target;
    console.log(target);
  }

  onTouchEnd(): void {
    this.startX = 370;
    this.currentX = 370;
  }

  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }
}
