import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../mockData/mockData';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute,  } from '@angular/router';


@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{
  public article!:Article;


  constructor(private articlesService: ArticlesService, private route: ActivatedRoute){}

  // use switchMap here
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    if (id) {
      this.articlesService.getArcticle(id).subscribe(item => {
        this.article = item
      })
    }
  }
}
