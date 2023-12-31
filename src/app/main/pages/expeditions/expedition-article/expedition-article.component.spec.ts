import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionArticleComponent } from './expedition-article.component';
import {ActivatedRoute, Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";
import {NgxsModule} from "@ngxs/store";
import {ExpeditionsState} from "../../../../store/expeditions/expeditions.state";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ExpeditionArticleComponent', () => {
  let component: ExpeditionArticleComponent;
  let fixture: ComponentFixture<ExpeditionArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExpeditionArticleComponent, TranslateModule.forRoot(), NgxsModule.forRoot([ExpeditionsState]), HttpClientTestingModule],
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
    fixture = TestBed.createComponent(ExpeditionArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
