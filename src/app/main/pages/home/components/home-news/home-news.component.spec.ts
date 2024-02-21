import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewsComponent } from './home-news.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('HomeNewsComponent', () => {
  let component: HomeNewsComponent;
  let fixture: ComponentFixture<HomeNewsComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, RouterModule.forRoot([]), HomeNewsComponent],
      providers: [TranslateService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
              }
            }
          }
        }
      ]
    });
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(HomeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title correctly', () => {
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('.news__title');
    const translatedTitle = translateService.instant('home.home-news.title');
    expect(titleElement.textContent).toContain(translatedTitle);
  });
});
