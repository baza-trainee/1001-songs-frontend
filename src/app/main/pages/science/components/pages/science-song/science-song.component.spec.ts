import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceSongComponent } from './science-song.component';
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ScienceSongComponent', () => {
  let component: ScienceSongComponent;
  let fixture: ComponentFixture<ScienceSongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScienceSongComponent, TranslateModule.forRoot(), BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(ScienceSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
