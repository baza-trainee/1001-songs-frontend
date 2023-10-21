import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../../../../shared/services/audio/audio.service';
import { Select, Store } from '@ngxs/store';
import { PlayerState } from 'src/app/store/player/player.state';
import { Observable, Subject, skip, takeUntil } from 'rxjs';
import { Song } from 'src/app/shared/interfaces/song.interface';
import { CloudService } from 'src/app/shared/services/audio/cloud.service';
import { SelectNext, SelectPrev } from 'src/app/store/player/player.actions';
import { StreamState } from 'src/app/shared/interfaces/stream-state.interface';
import { MultiAudioService } from 'src/app/shared/services/audio/multi-audio.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-multichanel-player',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './multichanel-player.component.html',
  styleUrls: ['./multichanel-player.component.scss']
})
export class MultichanelPlayerComponent implements OnInit, OnDestroy {
  private REWIND_STEP: number = 5;

  isPreloader = false;

  isVisible: boolean = false;
  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<Song>;
  state$: Observable<StreamState[]>;

  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private multiAudioService: MultiAudioService,
    private audioService: AudioService,
    private cloudService: CloudService,
    private store: Store
  ) {
    this.state$ = this.multiAudioService.getMultichannelState();
  }

  ngOnInit() {
    this.selectedSong$?.pipe(takeUntil(this.destroy$)).subscribe((song) => {
      this.multiAudioService.stopAll();
      if (song.media && song.media.multichannel_audio.length > 1) {
        this.openFile(song);
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    });

    this.state$
      .pipe(takeUntil(this.destroy$))
      .pipe(skip(1))
      .subscribe((states) => {
        const loading = states.filter((state) => !state.playing);
        if (!loading.length) {
          this.isPreloader = false;
        }
        const canPlay = states.filter((state) => !state.canplay);
        if (canPlay.length) {
          this.synchronizeTracs();
        }
      });
  }

  synchronizeTracs() {
    setTimeout(() => {
      this.multiAudioService.seekTo(Number(0));
    }, 500);
  }

  ngOnDestroy() {
    this.stop();
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }

  playStream(urls: string[]) {
    this.multiAudioService.playStreamAll(urls).subscribe();
  }

  openFile(file: Song) {
    //  this.currentFile = file;
    this.isPreloader = true;
    this.audioService.stop();
    this.multiAudioService.stopAll();
    const urls = file.media.multichannel_audio.map((url) => this.cloudService.preparateGoogleDriveFileUrl(url));
    this.playStream(urls);
  }

  muteToggle(index: number) {
    this.multiAudioService.toggleMute(index);
  }

  pause() {
    this.multiAudioService.pause();
  }

  play() {
    this.multiAudioService.play();
  }

  stop() {
    this.multiAudioService.stopAll();
  }

  next() {
    this.store.dispatch(new SelectNext());
  }

  previous() {
    this.store.dispatch(new SelectPrev());
  }

  backward(value: string) {
    this.multiAudioService.seekTo(Number(value) - this.REWIND_STEP);
  }

  forward(value: string) {
    this.multiAudioService.seekTo(Number(value) + this.REWIND_STEP);
  }

  onSliderChangeEnd(event: Event) {
    if (event && event.target && event.target) {
      const target = event.target as HTMLInputElement;
      const sliderValue: number = target.value as unknown as number;
      this.audioService.seekTo(sliderValue);
    }
  }
}
