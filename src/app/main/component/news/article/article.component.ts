import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../mockData/mockData';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute, Router, UrlSegment,  } from '@angular/router';


@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{
  public article!:Article;
  public isId!: UrlSegment;


  constructor(private articlesService: ArticlesService, private router: Router, private route: ActivatedRoute){}

  // use switchMap here
  ngOnInit(): void {
    this.isId = this.route.snapshot.url[1];
    
    if (this.isId) {
      this.articlesService.getArcticle(Number(this.isId)).subscribe(item => {
        this.article = item
      })
    }
  }

  goBack() {
    this.router.navigate(['/news']);
  }
}
