import { TestBed } from '@angular/core/testing';

import { ExpeditionsService } from './expeditions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from "@angular/common/http";

describe('ExpeditionsService', () => {
  let service: ExpeditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExpeditionsService, HttpClient, HttpHandler]

    });
    service = TestBed.inject(ExpeditionsService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
