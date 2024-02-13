import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeInCarouselComponent } from './fade-in-carousel.component';

describe('FadeInCarouselComponent', () => {
  let component: FadeInCarouselComponent;
  let fixture: ComponentFixture<FadeInCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FadeInCarouselComponent]
    });
    fixture = TestBed.createComponent(FadeInCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
