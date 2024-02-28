import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardSliderComponent } from './news-card-slider.component';

describe('NewsCardSliderComponent', () => {
  let component: NewsCardSliderComponent;
  let fixture: ComponentFixture<NewsCardSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewsCardSliderComponent]
    });
    fixture = TestBed.createComponent(NewsCardSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
