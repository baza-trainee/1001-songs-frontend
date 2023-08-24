import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../article.interface';
import { CutText } from '../../services/sort-by-date.pipe';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule, CutText],
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {

  public articles!: Article[];



  constructor(private articledService: ArticlesService){}

  ngOnInit(): void {
    // get sorted articles by date
    this.articledService.getArticles().subscribe(articles => {
      this.articles = articles.sort((a: Article, b: Article) => new Date(b.date.split(".").reverse().join(', ')).getTime() - new Date(a.date.split(".").reverse().join(', ')).getTime());
  });
  }

}
