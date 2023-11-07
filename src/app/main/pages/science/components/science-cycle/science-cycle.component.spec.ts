import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceCycleComponent } from './science-cycle.component';

describe('ScienceCycleComponent', () => {
  let component: ScienceCycleComponent;
  let fixture: ComponentFixture<ScienceCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScienceCycleComponent]
    });
    fixture = TestBed.createComponent(ScienceCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
