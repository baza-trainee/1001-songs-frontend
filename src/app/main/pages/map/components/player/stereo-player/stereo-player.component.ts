import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamState } from '../../../../../../shared/interfaces/stream-state.interface';
import { AudioService } from '../../../../../../shared/services/audio/audio.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { PlayerState } from 'src/app/store/player/player.state';
import { Song } from 'src/app/shared/interfaces/song.interface';
import { Select, Store } from '@ngxs/store';
import { SelectNext, SelectPrev } from 'src/app/store/player/player.actions';
import { MultiAudioService } from 'src/app/shared/services/audio/multi-audio.service';

@Component({
  selector: 'app-stereo-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stereo-player.component.html',
  styleUrls: ['./stereo-player.component.scss']
})
export class StereoPlayerComponent implements OnInit, OnDestroy {
  private REWIND_STEP: number = 5;

  showStereoPlayer: boolean = true;

  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<Song>;
  state$!: Observable<StreamState>;
  subState!: Subscription;
  isPreloader = false;

  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private audioService: AudioService,
    private multiAudioService: MultiAudioService,
    private store: Store
  ) {}

  ngOnInit() {
    this.selectedSong$?.pipe(takeUntil(this.destroy$)).subscribe((song) => {
      this.stop();
      const channels = this.multiAudioService.getChannles(song);
      if (song.media && this.multiAudioService.getChannles(song).length > 1) {
        this.showStereoPlayer = false;
      } else {
        this.showStereoPlayer = true;
      }
      if (song.media && song.media.stereo_audio) {
        this.openFile(song);
      }
    });
    this.state$ = this.audioService.getState();

    this.state$.pipe(takeUntil(this.destroy$)).subscribe((ev) => {
      if (ev.canplay && this.isPreloader) {
        this.isPreloader = false;
      }
    });
  }

  ngOnDestroy() {
    this.stop();
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe();
  }

  openFile(file: Song) {
    this.isPreloader = true;
    this.multiAudioService.stopAll();
    this.audioService.stop();
    this.playStream(file.media.stereo_audio);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    this.store.dispatch(new SelectNext());
  }

  previous() {
    this.store.dispatch(new SelectPrev());
  }

  backward(currentTime: number | undefined) {
    this.audioService.seekTo(Number(currentTime) - this.REWIND_STEP);
  }

  forward(currentTime: number | undefined) {
    this.audioService.seekTo(Number(currentTime) + this.REWIND_STEP);
  }

  onSliderChangeEnd(event: Event) {
    if (event && event.target && event.target) {
      const target = event.target as HTMLInputElement;
      const sliderValue: number = target.value as unknown as number;
      this.audioService.seekTo(sliderValue);
    }
  }
}
