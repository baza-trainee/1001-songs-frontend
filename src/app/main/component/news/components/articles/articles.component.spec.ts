import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Article } from '../../article.interface';
import { ArticlesService } from '../../services/articles.service';
import { articles } from '../../utils/mock-data';

import { ArticlesComponent } from './articles.component';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let articlesService!: ArticlesService;
  let articlesSpy!: jasmine.SpyObj<ArticlesService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticlesComponent, TranslateModule.forRoot()],
      providers: [{ provide: ArticlesService, useValue: articles }, HttpClient, HttpHandler]
    });
    articlesService = TestBed.inject(ArticlesService);
    articlesSpy = TestBed.inject(ArticlesService) as jasmine.SpyObj<ArticlesService>;
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should have articles', () => {
    const value: Observable<Article[]> = of(articles);
    articlesSpy.getArticles.and.returnValue(value);

    expect(articlesService.getArticles()).withContext('service returned articles').toBe(value);
  });
});
