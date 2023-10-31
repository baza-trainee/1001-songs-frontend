import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultichanelPlayerComponent } from './multichanel-player.component';
import { NgxsModule } from '@ngxs/store';
import { PlayerState } from 'src/app/store/player/player.state';
import { HttpClientModule } from '@angular/common/http';

describe('MultichanelPlayerComponent', () => {
  let component: MultichanelPlayerComponent;
  let fixture: ComponentFixture<MultichanelPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MultichanelPlayerComponent, NgxsModule.forRoot([PlayerState]), HttpClientModule]
    });
    fixture = TestBed.createComponent(MultichanelPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
