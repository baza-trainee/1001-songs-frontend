import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../article/article.component';
import { ArticlesService } from '../services/articles.service';
import { Article } from '../mockData/mockData';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {FilterComponent} from '../filter/filter.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    ArticleComponent,
    RouterLink,
    FilterComponent
  ],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  public articles!: Article[];
  private unsub!: Subscription;

  constructor(private articlesService: ArticlesService, private router: Router,){}

  ngOnInit(): void {
    this.unsub = this.articlesService.getArticles().subscribe(articles => this.articles = articles);

  }

  filteredArticles(articles: Article[]): void {
    this.articles = articles;

  };


  showArticle(id: number) {

    this.router.navigate(['/article', id])
  }

  ngOnDestroy(): void {
    this.unsub;
  }

}
