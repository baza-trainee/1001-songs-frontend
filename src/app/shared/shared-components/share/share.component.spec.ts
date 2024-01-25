import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareComponent } from './share.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

describe('ShareComponent', () => {
  let component: ShareComponent;
  let fixture: ComponentFixture<ShareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShareComponent, TranslateModule.forRoot()],
      providers: [TranslateService]
    });
    fixture = TestBed.createComponent(ShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
