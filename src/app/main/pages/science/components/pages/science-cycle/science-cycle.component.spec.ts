import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceCycleComponent } from './science-cycle.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('ScienceCycleComponent', () => {
  let component: ScienceCycleComponent;
  let fixture: ComponentFixture<ScienceCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScienceCycleComponent, TranslateModule.forRoot(), BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({ category: 'someCategory' })
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ScienceCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
