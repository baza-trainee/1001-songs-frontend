import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceSongsComponent } from './science-songs.component';
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxsModule} from "@ngxs/store";
import {PlayerState} from "../../../../../../store/player/player.state";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ScienceSongsComponent', () => {
  let component: ScienceSongsComponent;
  let fixture: ComponentFixture<ScienceSongsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScienceSongsComponent, TranslateModule.forRoot(), BrowserAnimationsModule, NgxsModule.forRoot([PlayerState]), HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ category: 'someCategory' })
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ScienceSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
