import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareModalComponent } from './share-modal.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DialogRef} from "@angular/cdk/dialog";

describe('ShareModalComponent', () => {
  let component: ShareModalComponent;
  let fixture: ComponentFixture<ShareModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ShareModalComponent],
      providers: [TranslateService,
        {
          provide: DialogRef,
          useValue: {
            snapshot: {
              data: {
              }
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ShareModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
