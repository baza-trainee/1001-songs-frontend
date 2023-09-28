import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowOutwardComponent } from './arrow-outward.component';

describe('ArrowOutwardComponent', () => {
  let component: ArrowOutwardComponent;
  let fixture: ComponentFixture<ArrowOutwardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArrowOutwardComponent]
    });
    fixture = TestBed.createComponent(ArrowOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
