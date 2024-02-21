import { TestBed } from '@angular/core/testing';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { ProjectService } from './project.service';

let service: ProjectService;
describe('ProjectService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
