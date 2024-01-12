import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';

import { ArticleItemComponent } from './article-item.component';
import { NewsState } from '../../../../../store/news/news.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArticleItemComponent', () => {
  let component: ArticleItemComponent;
  let fixture: ComponentFixture<ArticleItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, RouterTestingModule, NgxsModule.forRoot([NewsState])],
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
      news_title: "Заголовок новости",
      type_of_news: "Важные события",
      date: "2024-01-12",
      location: "Город",
      photo_1: "url_1.jpg",
      text_1: "Текст новости",
      photo_2: "url_2.jpg",
      text_2: "Дополнительный текст новости",
      author: "Имя Автора",
      editor: "Имя Редактора",
      svitliny: "Свитлина",
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
