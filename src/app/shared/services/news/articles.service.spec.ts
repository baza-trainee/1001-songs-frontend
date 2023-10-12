import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ArticlesService } from './articles.service';

let service: ArticlesService;

describe('ArticlesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticlesService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(ArticlesService);
  });

  it('should return values', () => {
    expect(service.getArticles()).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
