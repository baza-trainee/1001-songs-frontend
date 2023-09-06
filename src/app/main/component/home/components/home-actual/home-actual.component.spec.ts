import { ComponentFixture, TestBed } from '@angular/core/testing';

import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {HomeActualComponent} from "./home-actual.component";

describe('HomeActualComponent', () => {
  let component: HomeActualComponent;
  let fixture: ComponentFixture<HomeActualComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HomeActualComponent],
      providers: [TranslateService,
        {
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
    fixture = TestBed.createComponent(HomeActualComponent);
    component = new HomeActualComponent(translateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
