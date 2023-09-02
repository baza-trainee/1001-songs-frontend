import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExpeditionComponent } from './home-expedition.component';

describe('HomeExpeditionComponent', () => {
  let component: HomeExpeditionComponent;
  let fixture: ComponentFixture<HomeExpeditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeExpeditionComponent]
    });
    fixture = TestBed.createComponent(HomeExpeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
