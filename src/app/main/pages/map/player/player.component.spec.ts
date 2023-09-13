import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlayerComponent],
      providers: [TranslateService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
              }
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
