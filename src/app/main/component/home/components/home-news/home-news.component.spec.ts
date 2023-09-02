import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewsComponent } from './home-news.component';

describe('HomeNewsComponent', () => {
  let component: HomeNewsComponent;
  let fixture: ComponentFixture<HomeNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeNewsComponent]
    });
    fixture = TestBed.createComponent(HomeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
