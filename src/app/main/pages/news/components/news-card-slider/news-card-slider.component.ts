import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItem } from "../../../../../shared/interfaces/article.interface";
import {Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-news-card-slider',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './news-card-slider.component.html',
  styleUrls: ['./news-card-slider.component.scss']
})
export class NewsCardSliderComponent {
  @Input() items: NewsItem[] = [];

  constructor(
    private router: Router
  ) {}

  redirectToNews(id: number) {
    this.router.navigate([ '/news/' + id]);
  }
}
