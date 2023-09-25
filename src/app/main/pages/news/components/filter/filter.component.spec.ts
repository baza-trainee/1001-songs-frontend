import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { first } from 'rxjs';

import { ArticlesService } from '../../services/articles.service';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let articleService: ArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FilterComponent, TranslateModule.forRoot()],
      providers: [ArticlesService, HttpClient, HttpHandler]
    });
    articleService = TestBed.inject(ArticlesService);
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should react on event', () => {
    component.filteredArticles.pipe(first()).subscribe((articles: any) => {
      expect(articles.length).toEqual(6);
      component.filterArticles('Усі');
    });
  });
});
