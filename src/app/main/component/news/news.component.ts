import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

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
  ]
})

export class NewsComponent {

}
