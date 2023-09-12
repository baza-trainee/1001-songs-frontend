import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {HomeExpeditionComponent} from "./home-expedition.component";

describe('HomeExpeditionComponent', () => {
  let component: HomeExpeditionComponent;
  let fixture: ComponentFixture<HomeExpeditionComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), RouterModule.forRoot([]), HomeExpeditionComponent],
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
    fixture = TestBed.createComponent(HomeExpeditionComponent);
    component = new HomeExpeditionComponent(translateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a router link', () => {
    fixture.detectChanges();
    const routerLinkElement = fixture.nativeElement.querySelector('.expeditions__router-link');

    expect(routerLinkElement).toBeTruthy();
    expect(routerLinkElement.getAttribute('routerLink')).toBeDefined();
  });

  it('should display the title correctly', () => {
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('.expeditions__title');
    const translatedTitle = translateService.instant('home.home-expeditions.title');
    expect(titleElement.textContent).toContain(translatedTitle);
  });

});
