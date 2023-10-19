import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectComponent } from './multiselect.component';
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormControl, FormsModule} from "@angular/forms";

describe('MultiselectComponent', () => {
  let component: MultiselectComponent;
  let fixture: ComponentFixture<MultiselectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MultiselectComponent, TranslateModule.forRoot(), BrowserAnimationsModule, FormsModule]
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
