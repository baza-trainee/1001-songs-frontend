import { TestBed } from '@angular/core/testing';

import { CloudService } from './cloud.service';
import {HttpClientModule} from "@angular/common/http";

describe('CloudService', () => {
  let service: CloudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(CloudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
