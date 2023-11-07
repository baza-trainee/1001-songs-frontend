import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent {
  @Input() article!: {
    images: string[];
    location: string;
    id: number;
    text: string[];
    title: string;
    eventDate: string;
  };

  constructor() {}
}
