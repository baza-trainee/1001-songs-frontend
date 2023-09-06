import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewsComponent } from './home-news.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";

describe('HomeNewsComponent', () => {
  let component: HomeNewsComponent;
  let fixture: ComponentFixture<HomeNewsComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HomeNewsComponent],
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
});
