import { TestBed } from '@angular/core/testing';

import { EducationService } from './education.service';
import { HttpClientModule } from '@angular/common/http';

describe('EducationService', () => {
  let service: EducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(EducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
