import { TestBed } from '@angular/core/testing';
import {FormattingTextService} from "./formating-text.service";


describe('FormattingTextService', () => {
  let service: FormattingTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormattingTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
