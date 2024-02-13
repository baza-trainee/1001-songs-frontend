import { TestBed } from '@angular/core/testing';

import { FormatingTextService } from './formating-text.service';

describe('FormatingTextService', () => {
  let service: FormatingTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatingTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
