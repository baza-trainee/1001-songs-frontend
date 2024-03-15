import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamState } from '../../../../../../shared/interfaces/stream-state.interface';
import { AudioService } from '../../../../../../shared/services/audio/audio.service';
import { Observable, Subject, Subscription, of, takeUntil } from 'rxjs';
import { PlayerSong } from 'src/app/shared/interfaces/song.interface';
import { Store } from '@ngxs/store';
import { SelectNext, SelectPrev } from 'src/app/store/player/player.actions';
import { MultiAudioService } from 'src/app/shared/services/audio/multi-audio.service';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stereo-player',
  standalone: true,
  imports: [CommonModule, MatSliderModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './stereo-player.component.html',
  styleUrls: ['./stereo-player.component.scss']
})
export class StereoPlayerComponent implements OnInit, OnDestroy {
  private REWIND_STEP: number = 5;

  @Input() autoplay: boolean = false;
  @Input() song$: Observable<PlayerSong> = of({} as PlayerSong);

  @Output() isPlay: EventEmitter<Order> = new EventEmitter<Order>();
  showStereoPlayer: boolean = true;

  state$!: Observable<StreamState>;
  subState!: Subscription;
  isPreloader = false;
  currentSong!: PlayerSong;

  isMuted = false;

  destroy$: Subject<void> = new Subject<void>();

  volume = new FormControl(10);

  constructor(
    private audioService: AudioService,
    private multiAudioService: MultiAudioService,
    private store: Store
  ) {}

  ngOnInit() {
    this.song$.subscribe((playerSong) => {
      if (playerSong.stereo) {
        this.currentSong = playerSong;
        this.openFile(playerSong);
        this.audioService.setUpVolume(this.volume.value === 0? this.volume.value : 10);
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

  toggleMute() {
    if (this.isMuted) {
      this.audioService.setUpVolume(10);
      this.isMuted = false;
      this.volume.setValue(10);
    } else {
      this.audioService.setUpVolume(0);
      this.isMuted = true;
      this.volume.setValue(0);
    }
  }

  setUpVolume(eventObj: Event) {
    const event = eventObj as { target: object };
    const target = event.target as { value: number };
    this.audioService.setUpVolume(target.value);
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
    this.isPlay.emit({ id: this.currentSong.id, type: 'stp-pause' });
  }

  play() {
    this.audioService.play();
    this.isPlay.emit({ id: this.currentSong.id, type: 'stp-play' });
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    this.store.dispatch(new SelectNext());
    this.isPlay.emit({ id: this.currentSong.id, type: 'stp-play' });
  }

  previous() {
    this.store.dispatch(new SelectPrev());
    this.isPlay.emit({ id: this.currentSong.id, type: 'stp-play' });
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
