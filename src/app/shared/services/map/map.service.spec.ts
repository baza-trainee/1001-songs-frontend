import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';
import { NgxsModule } from '@ngxs/store';
import { MapState } from 'src/app/store/map/map.state';
import { HttpClientModule } from '@angular/common/http';

describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
