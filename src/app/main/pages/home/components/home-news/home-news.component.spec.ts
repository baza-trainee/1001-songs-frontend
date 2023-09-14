import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewsComponent } from './home-news.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, RouterModule} from "@angular/router";

describe('HomeNewsComponent', () => {
  let component: HomeNewsComponent;
  let fixture: ComponentFixture<HomeNewsComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), RouterModule.forRoot([]), HomeNewsComponent],
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
    component = new HomeNewsComponent(translateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a router link', () => {
    fixture.detectChanges();
    const routerLinkElement = fixture.nativeElement.querySelector('.news__router-link');

    expect(routerLinkElement).toBeTruthy();
    expect(routerLinkElement.getAttribute('routerLink')).toBeDefined();
  });

  it('should display the title correctly', () => {
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('.news__title');
    const translatedTitle = translateService.instant('home.home-news.title');
    expect(titleElement.textContent).toContain(translatedTitle);
  });
});
