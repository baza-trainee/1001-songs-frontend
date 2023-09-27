import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsComponent} from './news.component';
import {TranslateModule} from '@ngx-translate/core';
import {ArticlesService} from './services/articles.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewsComponent, TranslateModule.forRoot()],
      providers: [{provide: ArticlesService}, HttpClient, HttpHandler]
    });

    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
