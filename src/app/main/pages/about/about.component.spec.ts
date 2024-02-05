import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { AboutComponent } from './about.component';
import {NgxsModule} from "@ngxs/store";
import {NewsState} from "../../../store/news/news.state";
import {HttpClientTestingModule} from "@angular/common/http/testing";
describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), AboutComponent, HttpClientTestingModule, NgxsModule.forRoot([NewsState])]
    });
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
