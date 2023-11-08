import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { NewsState } from '../../../../../store/news/news.state';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../../../../shared/interfaces/article.interface';
import { BreadcrumbsComponent } from 'src/app/shared/shared-components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-news-article',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent {
  @Select(NewsState.getSelectedArticle) selectedArticle$?: Observable<Article>;
}
