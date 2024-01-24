import { TestBed } from '@angular/core/testing';

import { DonationService } from './donation.service';
import {HttpClientModule} from "@angular/common/http";

describe('DonationService', () => {
  let service: DonationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(DonationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
