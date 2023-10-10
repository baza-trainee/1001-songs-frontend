import { TestBed } from '@angular/core/testing';

import { MultiAudioService } from './multi-audio.service';

describe('MultichanelAudioService', () => {
  let service: MultiAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
