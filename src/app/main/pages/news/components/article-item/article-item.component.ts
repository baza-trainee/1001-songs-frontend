import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {Article} from "../../../../../shared/interfaces/article.interface";

@Component({
  selector: 'app-article-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent {
  @Input() article!: Article;

  constructor() {}
}
