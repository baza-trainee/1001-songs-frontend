import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {ActivatedRoute} from "@angular/router";
import {HomeExpeditionComponent} from "./home-expedition.component";

describe('HomeExpeditionComponent', () => {
  let component: HomeExpeditionComponent;
  let fixture: ComponentFixture<HomeExpeditionComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HomeExpeditionComponent],
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
});
