import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowDownComponent } from './arrow-down.component';

describe('ArrowDownComponent', () => {
  let component: ArrowDownComponent;
  let fixture: ComponentFixture<ArrowDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArrowDownComponent]
    });
    fixture = TestBed.createComponent(ArrowDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
