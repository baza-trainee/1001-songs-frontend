import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeInCarouselComponent } from './fade-in-carousel.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatDialogModule} from "@angular/material/dialog";

describe('FadeInCarouselComponent', () => {
  let component: FadeInCarouselComponent;
  let fixture: ComponentFixture<FadeInCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FadeInCarouselComponent, TranslateModule.forRoot(), MatDialogModule]
    });
    fixture = TestBed.createComponent(FadeInCarouselComponent);
    component = fixture.componentInstance;

    component.photos = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
