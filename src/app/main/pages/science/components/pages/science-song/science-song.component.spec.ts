import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceSongComponent } from './science-song.component';
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgxsModule} from "@ngxs/store";
import {PlayerState} from "../../../../../../store/player/player.state";
import {ActivatedRoute, RouterModule} from "@angular/router";

describe('ScienceSongComponent', () => {
  let component: ScienceSongComponent;
  let fixture: ComponentFixture<ScienceSongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScienceSongComponent, TranslateModule.forRoot(), BrowserAnimationsModule, RouterModule.forRoot([]), HttpClientTestingModule, NgxsModule.forRoot([PlayerState])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 'some_dummy_id' }
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ScienceSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
