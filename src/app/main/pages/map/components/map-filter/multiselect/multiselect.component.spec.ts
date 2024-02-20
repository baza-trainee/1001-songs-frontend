import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';

import { MultiselectComponent } from './multiselect.component';
import { MapState } from '../../../../../../store/map/map.state';
import { FilterMapService } from '../../../../../../shared/services/filter-map/filter-map.service';

describe('MultiselectComponent', () => {
  let component: MultiselectComponent;
  let fixture: ComponentFixture<MultiselectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        MultiselectComponent,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgxsModule.forRoot([MapState])
      ],
      providers: [FilterMapService, TranslateService]
    });

    fixture = TestBed.createComponent(MultiselectComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
