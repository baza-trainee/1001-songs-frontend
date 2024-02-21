import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamState } from '../../../../../../shared/interfaces/stream-state.interface';
import { AudioService } from '../../../../../../shared/services/audio/audio.service';
import { Observable, Subject, Subscription, of, takeUntil } from 'rxjs';
import { PlayerSong } from 'src/app/shared/interfaces/song.interface';
import { Store } from '@ngxs/store';
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

  @Input() stereoOnly: boolean = false;
  @Input() autoplay: boolean = false;
  @Input() song$: Observable<PlayerSong> = of({} as PlayerSong);

  @Output() isPlay: EventEmitter<boolean> = new EventEmitter<boolean>();
  showStereoPlayer: boolean = true;

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
    this.song$.subscribe((playerSong) => {
      console.log(playerSong)
      if (playerSong.stereo) {
        this.openFile(playerSong);
      }
    });

    this.state$ = this.audioService.getState();

    this.state$.pipe(takeUntil(this.destroy$)).subscribe((ev) => {
      if (ev.canplay && this.isPreloader) {
        this.isPreloader = false;
        if (!this.autoplay) {
          this.pause();
        }
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

  openFile(file: PlayerSong) {
    this.isPreloader = true;
    this.multiAudioService.stopAll();
    this.audioService.stop();
    this.playStream(file.stereo);
  }

  pause() {
    this.audioService.pause();
    this.isPlay.emit(false);
  }

  play() {
    this.audioService.play();
    this.isPlay.emit(true);
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    this.store.dispatch(new SelectNext());
    this.isPlay.emit(true);
  }

  previous() {
    this.store.dispatch(new SelectPrev());
    this.isPlay.emit(true);
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
