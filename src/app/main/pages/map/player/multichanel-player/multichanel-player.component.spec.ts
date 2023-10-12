import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultichanelPlayerComponent } from './multichanel-player.component';

describe('MultichanelPlayerComponent', () => {
  let component: MultichanelPlayerComponent;
  let fixture: ComponentFixture<MultichanelPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MultichanelPlayerComponent]
    });
    fixture = TestBed.createComponent(MultichanelPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
