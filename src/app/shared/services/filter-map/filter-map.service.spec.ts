import { TestBed } from '@angular/core/testing';

import { FilterMapService } from './filter-map.service';

describe('FilterMapService', () => {
  let service: FilterMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
