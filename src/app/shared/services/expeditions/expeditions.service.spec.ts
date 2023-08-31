import { TestBed } from '@angular/core/testing';

import { ExpeditionsService } from './expeditions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { testCategories, testExpeditionsData } from 'src/mock-data/tests';

describe('ExpeditionsService', () => {
  let service: ExpeditionsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ExpeditionsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('can test HttpClient.get', () => {
    const testUrl = `http://localhost:3000/`;

    httpClient.get(`${testUrl}expeditions`).subscribe((data) => {
      expect(data).toEqual(testExpeditionsData);
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${testUrl}expeditions`
    });
    expect(req.request.method).toEqual('GET');
    req.flush(testExpeditionsData);
    httpTestingController.verify();
  });

  it('should return subscribtion for array of categories', () => {
    const categories = service.getCategories();
    expect(categories).toEqual(testCategories);
  });

  it('should return subscribtion for array of Iexpeditions', () => {
    spyOn(service, 'getExpeditions').and.returnValue(of(testExpeditionsData));
    const exps = service.getExpeditions();
    exps.subscribe((data) => {
      expect(data).toEqual(testExpeditionsData);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
