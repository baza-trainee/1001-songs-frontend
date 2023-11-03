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
      images: ['url1', 'url2'],
      location: 'Some Location',
      id: 1,
      text: ['Text1', 'Text2'],
      title: 'Sample Title',
      eventDate: '2023-09-26'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
