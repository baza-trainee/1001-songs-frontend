import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpeditionCardComponent } from './expedition-card.component';
import {TranslateModule} from "@ngx-translate/core";
import {NgxsModule} from "@ngxs/store";
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {ExpeditionsState} from "../../../store/expeditions/expeditions.state";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('ExpeditionCardComponent', () => {
  let component: ExpeditionCardComponent;
  let fixture: ComponentFixture<ExpeditionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExpeditionCardComponent, TranslateModule.forRoot(), NgxsModule.forRoot([ExpeditionsState]), HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {}
            }
          }
        },
        {
          provide: Router,
          useClass: RouterTestingModule
        }
      ]
    });
    fixture = TestBed.createComponent(ExpeditionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
