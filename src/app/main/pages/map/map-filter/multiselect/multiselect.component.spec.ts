import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MultiselectComponent } from './multiselect.component';
import { FilterMapService } from '../../../../../shared/services/filter-map/filter-map.service';
import { NgxsModule } from '@ngxs/store';
import { MapState } from '../../../../../store/map/map.state';

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
    component.options = ['Option1', 'Option2'];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
