import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeActualComponent } from './home-actual.component';

describe('HomeActualComponent', () => {
  let component: HomeActualComponent;
  let fixture: ComponentFixture<HomeActualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeActualComponent]
    });
    fixture = TestBed.createComponent(HomeActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
