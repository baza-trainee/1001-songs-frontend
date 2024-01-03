import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';
import { NgxsModule } from '@ngxs/store';
import { MapState } from '../../../../../../store/map/map.state';
import { FormControl, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SearchInputComponent,
        NgxsModule.forRoot([MapState]),
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    component.options = 'Option1';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
