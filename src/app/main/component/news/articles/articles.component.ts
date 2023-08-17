import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../article/article.component';
import {Observable} from "rxjs";
import { ArticlesService } from '../services/articles.service';
import { Article } from '../mockData/mockData';



@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, ArticleComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public articles$: Observable<Article[]> = new Observable<Article[]>

  constructor(private articlesService: ArticlesService){}

  ngOnInit(): void {
    this.articles$ = this.articlesService.getMockArticles();
  }

}
