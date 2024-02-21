import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ArticleItemComponent } from './article-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {NewsItem} from "../../../../../shared/interfaces/article.interface";

describe('ArticleItemComponent', () => {
  let component: ArticleItemComponent;
  let fixture: ComponentFixture<ArticleItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {}
            }
          }
        },
        {
          provide: Router,
          useClass: RouterTestingModule
        }
      ]
    });

    fixture = TestBed.createComponent(ArticleItemComponent);
    component = fixture.componentInstance;

    component.article = {
      id: 1,
      title: "Новость 1",
      short_description: "Краткое описание новости 1",
      preview_photo: "https://example.com/photo1.jpg",
      created_at: "2024-02-20T00:00:00",
      category: {
        id: 1,
        name: "Категория 1"
      },
      location: "Местоположение новости 1",
      content: "<p>Содержание новости 1</p>",
      authors: ["Автор 1", "Автор 2"],
      editors: ["Редактор 1", "Редактор 2"],
      photographers: ["Фотограф 1", "Фотограф 2"]
    } as NewsItem;


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
