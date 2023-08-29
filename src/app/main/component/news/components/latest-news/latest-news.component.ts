import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../article.interface';
import { CutText } from '../../services/sort-by-date.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule, CutText],
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {
  public articles!: Article[];

  currentIdx: number = 0;
  translateX: number = 0;
  step: number = 4;
  total: number = 0;

  constructor(
    private articledService: ArticlesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get sorted articles by date
    // reverse format date from dd-mm-yyyy to yyyy-mm-dd
    this.articledService.getArticles().subscribe((articles) => {
      this.articles = articles.sort(
        (a: Article, b: Article) =>
          new Date(b.date.split('.').reverse().join(', ')).getTime() - new Date(a.date.split('.').reverse().join(', ')).getTime()
      );
      this.updateVisibleArticles();
      this.total = Math.ceil(this.articles.length / this.step);
    });
  }
}
