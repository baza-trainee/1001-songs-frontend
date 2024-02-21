import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionsComponent } from './expeditions.component';
import { TranslateModule } from '@ngx-translate/core';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('ExpeditionsComponent', () => {
  let component: ExpeditionsComponent;
  let fixture: ComponentFixture<ExpeditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, ExpeditionsComponent],
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
    fixture = TestBed.createComponent(ExpeditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
