import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink, RouterOutlet, UrlSegment } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { ArticlesComponent } from './articles/articles.component';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    ArticlesComponent,
    RouterOutlet,
    RouterLink,
    NgFor,
    NgClass
  ]
})

export class NewsComponent {
  public readonly filters: string[] = ["Усі", "Зустрічі", "Лекції", "Публікації", "Майстер-класи", "Концерти", "Коференції"];
  public selectedFilter: string | null = null;
  public isId!: any;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  filterArticles(filter: string) {
    this.selectedFilter = filter;
  }
}
