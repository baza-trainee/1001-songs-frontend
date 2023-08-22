import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { Article } from '../../article.interface';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit, OnDestroy{
  public readonly filters: string[] = ["Усі", "Зустрічі", "Лекції", "Публікації", "Майстер-класи", "Концерти", "Коференції"];

  public selectedFilter: string = "Усі";
  public filterdBy!: Article[];
  private articles!: Article[];
  private unsub!: Subscription;

  @Output() filteredArticles = new EventEmitter<Article[]>();

  constructor(private articleService: ArticlesService){}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(articles => this.articles = articles);
  }

  filterArticles(filter: string) {

    if(filter) {
      this.selectedFilter = filter;

      if(filter === "Усі") {
        this.filterdBy = this.articles.slice(0, 3);
        this.filteredArticles.emit(this.filterdBy);

      } else {
        this.filterdBy = this.articles.filter(article => article.category === filter).slice(0, 3);
        this.filteredArticles.emit(this.filterdBy);

      }


    }

  }

  ngOnDestroy(): void {
    this.unsub;
  }
}
