import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ArticlesService } from '../../services/articles.service';
import { articles } from '../../utils/mock-data';

import { ArticlesComponent } from './articles.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticlesComponent, TranslateModule.forRoot()],
      providers: [{ provide: ArticlesService, useValue: articles }, HttpClient, HttpHandler]
    });

    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
