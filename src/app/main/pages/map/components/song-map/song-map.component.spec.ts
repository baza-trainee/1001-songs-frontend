import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

import { SongMapComponent } from './song-map.component';
import { PlayerState } from '../../../../../store/player/player.state';

describe('SongMapComponent', () => {
  let component: SongMapComponent;
  let fixture: ComponentFixture<SongMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SongMapComponent,
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
        NgxsModule.forRoot([PlayerState])
      ],
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
    fixture = TestBed.createComponent(SongMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
