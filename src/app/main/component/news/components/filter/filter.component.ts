import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';

import { Article } from '../../article.interface';
import { ArticlesService } from '../../services/articles.service';
import { SlideStringDirective } from '../../services/slide-string.directive';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgFor, SlideStringDirective],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  public readonly categories: string[] = ['Усі', 'Зустрічі', 'Лекції', 'Публікації', 'Майстер-класи', 'Концерти', 'Коференції'];

  public selectedFilter: string = 'Усі';
  private filteredArticle!: Article[];
  private articles!: Article[];
  private unSub!: Subscription;

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

  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }
}
