import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedSourcesComponent } from './recommended-sources.component';

describe('RecommendedSourcesComponent', () => {
  let component: RecommendedSourcesComponent;
  let fixture: ComponentFixture<RecommendedSourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecommendedSourcesComponent]
    });
    fixture = TestBed.createComponent(RecommendedSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
