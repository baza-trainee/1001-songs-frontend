import { TestBed } from '@angular/core/testing';

import { FilterMapService } from './filter-map.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { MapState } from '../../../store/map/map.state';

describe('FilterMapService', () => {
  let service: FilterMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, NgxsModule.forRoot([MapState])]
    });
    service = TestBed.inject(FilterMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
