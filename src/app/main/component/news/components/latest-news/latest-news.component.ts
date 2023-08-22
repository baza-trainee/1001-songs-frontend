import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../article.interface';
import { map, Observable } from 'rxjs';
import { SortByDatePipe } from '../../services/sort-by-date.pipe';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule, SortByDatePipe],
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {

  public articles!: Article[];



  constructor(private articledService: ArticlesService){}

  ngOnInit(): void {
    this.articledService.getArticles().pipe(map(article => {
      console.log(article)
    }));
  }

}
