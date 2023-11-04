import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionArticleComponent } from './expedition-article.component';

describe('ExpeditionArticleComponent', () => {
  let component: ExpeditionArticleComponent;
  let fixture: ComponentFixture<ExpeditionArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExpeditionArticleComponent]
    });
    fixture = TestBed.createComponent(ExpeditionArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
