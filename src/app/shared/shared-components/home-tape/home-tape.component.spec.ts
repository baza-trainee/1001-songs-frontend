import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTapeComponent } from './home-tape.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";

describe('HomeTapeComponent', () => {
  let component: HomeTapeComponent;
  let fixture: ComponentFixture<HomeTapeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HomeTapeComponent],
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
    fixture = TestBed.createComponent(HomeTapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
