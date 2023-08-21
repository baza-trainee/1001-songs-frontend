import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../mockData/mockData';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute, Params, Router, UrlSegment,  } from '@angular/router';
import { Observable, switchMap } from 'rxjs';


@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{
  public article$!: Observable<Article>;
  public isId!: UrlSegment;


  constructor(private articlesService: ArticlesService, private router: Router, private route: ActivatedRoute){}

  // use switchMap here
  ngOnInit(): void {
    this.isId = this.route.snapshot.url[1];

    if (this.isId) {

      this.article$ = this.route.params.pipe(
        switchMap((params: Params) => {
          return this.articlesService.getArcticle(params['id'])
        })
      )

      // this.articlesService.getArcticle(Number(this.isId)).subscribe(item => {
        // this.article = item
      // })
    }
  }

  goBack() {
    this.router.navigate(['/news']);
  }
}
