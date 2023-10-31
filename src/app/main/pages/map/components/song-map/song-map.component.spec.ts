import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongMapComponent } from './song-map.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('SongMapComponent', () => {
  let component: SongMapComponent;
  let fixture: ComponentFixture<SongMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SongMapComponent, HttpClientTestingModule, RouterModule.forRoot([]), TranslateModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'some_dummy_id' })
          }
        }
      ]
    });
    fixture = TestBed.createComponent(SongMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
