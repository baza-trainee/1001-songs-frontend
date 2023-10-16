import { TestBed } from '@angular/core/testing';

import { MultiAudioService } from './multi-audio.service';
import { NgxsModule } from '@ngxs/store';
import { ExpeditionsState } from 'src/app/store/expeditions/expeditions.state';

describe('MultichanelAudioService', () => {
  let service: MultiAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NgxsModule.forRoot([ExpeditionsState])]
    });
    service = TestBed.inject(MultiAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
