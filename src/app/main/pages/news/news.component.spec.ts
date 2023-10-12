import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsComponent} from './news.component';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ArticlesService} from "../../../shared/services/news/articles.service";

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
