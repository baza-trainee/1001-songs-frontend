import {HttpClient, HttpHandler} from '@angular/common/http';
import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';

import {FilterComponent} from './filter.component';
import {ArticlesService} from "../../services/news/articles.service";

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [FilterComponent, TranslateModule.forRoot()],
  //     providers: [ArticlesService, HttpClient, HttpHandler]
  //   });
  //   fixture = TestBed.createComponent(FilterComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FilterComponent, TranslateModule.forRoot()], // Імпортуємо модуль TranslateModule
      providers: [ArticlesService, HttpClient, HttpHandler] // Додаємо необхідні провайдери
    }).compileComponents(); // Компілюємо компоненти
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedFilterId', fakeAsync(() => {
    setTimeout(() => {
      component.selectedFilterId = 1;
      fixture.detectChanges();
    });
    tick(1000); // Затримка на 1 секунду
    expect(component.selectedFilterId).toEqual(1);
  }));
});
// beforeEach(waitForAsync(() => {
//   TestBed.configureTestingModule({
//     declarations: [FilterComponent]
//   }).compileComponents();
// }));
//
// beforeEach(() => {
//   fixture = TestBed.createComponent(FilterComponent);
//   component = fixture.componentInstance;
//   fixture.detectChanges();
// });
