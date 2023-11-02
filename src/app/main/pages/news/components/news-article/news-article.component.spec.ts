import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';

import { NewsArticleComponent } from './news-article.component';
import { NewsState } from '../../../../../store/news/news.state';

describe('NewsArticleComponent', () => {
  let component: NewsArticleComponent;
  let fixture: ComponentFixture<NewsArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewsArticleComponent, TranslateModule.forRoot(), NgxsModule.forRoot([NewsState]), HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(NewsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
