import { TestBed } from '@angular/core/testing';

import { ExpeditionsService } from './expeditions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';
import { testCategories, testExpeditionsData } from 'src/mock-data/tests';
import { API_URL } from '../../config/endpoints/stat-endpoints';

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
    service.getExpeditions().subscribe((data) => {
      expect(data).toEqual(testExpeditionsData);
    });
    const req = httpTestingController.expectOne(API_URL+'expeditions');
    req.flush(testExpeditionsData);
    httpTestingController.verify();
  });

  it('should return array of categories', () => {
    const categories = service.getCategories();
    expect(categories).toEqual(testCategories);
  });

  it('should return subscribtion for array of Iexpeditions', () => {
    spyOn(service, 'getExpeditions').and.returnValue(new BehaviorSubject(testExpeditionsData));
    const exps = service.getExpeditions();
    exps.subscribe((data) => {
      expect(data).toEqual(testExpeditionsData);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
