import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamStateInterface } from '../../../../../shared/interfaces/stream-state.interface';
import { AudioService } from '../../../../../shared/services/audio/audio.service';
import { MultichanelAudioService } from '../../../../../shared/services/audio/multichanel-audio.service';
import { Observable, Subscription } from 'rxjs';
import { PlaylistState } from 'src/app/store/playlist/playlist.state';
import { Song } from 'src/app/shared/interfaces/song';
import { Select, Store } from '@ngxs/store';
import { CloudService } from 'src/app/shared/services/audio/cloud.service';
import { SelectNext, SelectPrev } from 'src/app/store/playlist/playlist.actions';

@Component({
  selector: 'app-stereo-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stereo-player.component.html',
  styleUrls: ['./stereo-player.component.scss']
})
export class StereoPlayerComponent implements OnInit, OnDestroy {
  private REWIND_STEP: number = 5;
  showStereoPlayer: boolean = false;

  @Select(PlaylistState.getSelectedSong) selectedSong$?: Observable<Song>;
  state$!: Observable<StreamStateInterface>;
  subState!: Subscription;
  isPreloader = false;

  constructor(
    private audioService: AudioService,
    private multiChanelAudioService: MultichanelAudioService,
    private cloudService: CloudService,
    private store: Store
  ) {
    this.audioService.showStereoPlayer$.subscribe((showStereoPlayer) => {
      this.showStereoPlayer = showStereoPlayer;
    });
  }

  ngOnInit() {
    this.selectedSong$?.subscribe((song) => {
      if (song.media) {
        this.openFile(song);
      }
    });
    this.state$ = this.audioService.getState();

    this.subState = this.state$.subscribe((ev) => {
      if (ev.canplay && this.isPreloader) {
        this.isPreloader = false;
      }
    });
  }

  ngOnDestroy() {
    this.stop();
    this.audioService.showStereoPlayer$.next(false);
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe();
  }

  openFile(file: Song) {
    this.isPreloader = true;
    this.multiChanelAudioService.stopAll();
    this.audioService.stop();
    this.audioService.showStereoPlayer$.next(true);
    this.multiChanelAudioService.showMultichanelPlayerSubject.next(false);
    this.playStream(this.cloudService.preparateGoogleDriveFileUrl(file.media.stereo_audio));
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

  onSliderChangeEnd(event: any) {
    const sliderValue = event.target.value;
    this.audioService.seekTo(sliderValue);
  }
}
