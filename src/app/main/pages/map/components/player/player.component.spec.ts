import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import {TranslateModule, } from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import { NgxsModule } from '@ngxs/store';
import { PlayerState } from 'src/app/store/player/player.state';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientModule, PlayerComponent, NgxsModule.forRoot([PlayerState])],
    });
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
