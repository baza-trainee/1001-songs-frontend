import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendationComponent } from './recomendation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RecomendationComponent', () => {
  let component: RecomendationComponent;
  let fixture: ComponentFixture<RecomendationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecomendationComponent, BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(RecomendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
