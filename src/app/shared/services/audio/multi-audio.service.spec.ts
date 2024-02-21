import { TestBed } from '@angular/core/testing';

import { MultiAudioService } from './multi-audio.service';
import { HttpClientModule } from '@angular/common/http';
import {NgxsModule} from "@ngxs/store";
import {PlayerState} from "../../../store/player/player.state";

describe('MultichanelAudioService', () => {
  let service: MultiAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, NgxsModule.forRoot([PlayerState])]
    });
    service = TestBed.inject(MultiAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
