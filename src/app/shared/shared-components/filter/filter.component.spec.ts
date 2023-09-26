import {HttpClient, HttpHandler} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';

import {FilterComponent} from './filter.component';
import {ArticlesService} from "../../../main/pages/news/services/articles.service";

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FilterComponent, TranslateModule.forRoot()],
      providers: [ArticlesService, HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
