import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionCardComponent } from './expedition-card.component';

describe('ExpeditionCardComponent', () => {
  let component: ExpeditionCardComponent;
  let fixture: ComponentFixture<ExpeditionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExpeditionCardComponent]
    });
    fixture = TestBed.createComponent(ExpeditionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
