import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsComponent} from './news.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxsModule} from "@ngxs/store";
import {NewsState} from "../../../store/news/news.state";
import {HttpClientModule} from "@angular/common/http";

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientModule, NewsComponent, NgxsModule.forRoot([NewsState])]
    });
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
