import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardSliderComponent } from './news-card-slider.component';
import {ActivatedRoute} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

describe('NewsCardSliderComponent', () => {
  let component: NewsCardSliderComponent;
  let fixture: ComponentFixture<NewsCardSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewsCardSliderComponent, TranslateModule.forRoot()],
      providers: [TranslateService,
        { provide: ActivatedRoute, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(NewsCardSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
