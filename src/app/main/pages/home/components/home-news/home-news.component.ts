import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from "rxjs";
import { ArticlesService } from "../../../../../shared/services/news/articles.service";
import { NewsResponse } from "../../../../../shared/interfaces/article.interface";

@Component({
  selector: 'app-home-news',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})

export class HomeNewsComponent implements OnInit {
  public newsResponse$!: Observable<NewsResponse>;

  constructor(
      private _translate: TranslateService,
      private router: Router,
      private articleService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.newsResponse$ = this.articleService.fetchNews({page: 1, size: 5});
  }

  redirectToNews(id: number | undefined) {
    if (id) {
      this.router.navigate(['/news/' + id])
    } else {
      this.router.navigate(['/404'])
    }
  }
}
