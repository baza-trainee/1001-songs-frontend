import { TestBed } from '@angular/core/testing';

import { FooterService } from './footer.service';
import {HttpClientModule} from "@angular/common/http";

describe('FooterService', () => {
  let service: FooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(FooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
