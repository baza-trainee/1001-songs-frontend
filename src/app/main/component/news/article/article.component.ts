import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../mockData/mockData';
import { ArticlesService } from '../services/articles.service';
import { Route, } from '@angular/router';


@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{

  constructor(private articlesService: ArticlesService,){}

  // use switchMap here
  ngOnInit(): void {

  }
}
