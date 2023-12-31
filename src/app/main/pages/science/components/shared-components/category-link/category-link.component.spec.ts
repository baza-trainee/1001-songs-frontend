import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLinkComponent } from './category-link.component';

describe('CategoryLinkComponent', () => {
  let component: CategoryLinkComponent;
  let fixture: ComponentFixture<CategoryLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoryLinkComponent]
    });
    fixture = TestBed.createComponent(CategoryLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
