import { TestBed } from '@angular/core/testing';

import { ExpeditionsService } from './expeditions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { testExpeditionsData } from 'src/app/mock-data/tests';
import { environment } from 'src/environments/environment';

describe('ExpeditionsService', () => {
  let service: ExpeditionsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ExpeditionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('can test HttpClient.get', () => {
    service.fetchExpeditions().subscribe((data) => {
      expect(data).toEqual(testExpeditionsData);
    });
    const req = httpTestingController.expectOne(environment.baseUrl + 'expeditions');
    req.flush(testExpeditionsData);
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
