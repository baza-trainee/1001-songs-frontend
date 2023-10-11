import { TestBed } from '@angular/core/testing';

import { MultichanelAudioService } from './multichanel-audio.service';

describe('MultichanelAudioService', () => {
  let service: MultichanelAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultichanelAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
