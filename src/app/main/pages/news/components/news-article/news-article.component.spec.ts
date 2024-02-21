import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

import { NewsArticleComponent } from './news-article.component';
import {ActivatedRoute} from "@angular/router";

describe('NewsArticleComponent', () => {
  let component: NewsArticleComponent;
  let fixture: ComponentFixture<NewsArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewsArticleComponent, TranslateModule.forRoot(), HttpClientTestingModule],
      providers: [{
        provide: ActivatedRoute, useValue: {}
      }]
    });
    fixture = TestBed.createComponent(NewsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
