import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-item',
  standalone: true,
  imports: [CommonModule],
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
    eventDate: string
  };

  constructor(private router: Router) {}

  redirectToArticle(id: number) {
    this.router.navigate(['/article', id]);
  }
}
