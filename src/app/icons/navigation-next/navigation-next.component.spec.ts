import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationNextComponent } from './navigation-next.component';

describe('NavigationNextComponent', () => {
  let component: NavigationNextComponent;
  let fixture: ComponentFixture<NavigationNextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavigationNextComponent]
    });
    fixture = TestBed.createComponent(NavigationNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
