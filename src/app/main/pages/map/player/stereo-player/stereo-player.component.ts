import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAudioData } from '../../../../../shared/interfaces/audio-data.interface';
import { StreamStateInterface } from '../../../../../shared/interfaces/stream-state.interface';
import { AudioService } from '../../../../../shared/services/audio/audio.service';
import { MultichanelAudioService } from '../../../../../shared/services/audio/multichanel-audio.service';
import { BehaviorSubject, Observable, Subscription, take, tap } from 'rxjs';
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
  @Input() files: IAudioData[] = [];
  @Input() currentFile: Song | null = null;
  @Input() openCurrentFile!: (file: IAudioData) => void;
  secondsToRewindTrack: number = 5;
  state!: StreamStateInterface;
  showStereoPlayer: boolean = false;
  //  private playStreamSubscription: Subscription | undefined;
  // private getStateSubscription: Subscription | undefined;
  @Select(PlaylistState.getSelectedSong) selectedSong$?: Observable<Song>;
 // @Select(PlaylistState.getSongs) songs$?: Observable<Song[]>;
  state$!: Observable<StreamStateInterface>;
  subState!: Subscription;
  isPreloader = false;
  // isFirstPlaying = false;
  // isLastPlaying = false;

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
      // console.log('state', this.state);
      if (song.media) {
        this.openFile(song);
      }
    });
    this.state$ = this.audioService.getState();

    // this.getStateSubscription = this.audioService.getState().subscribe((state) => {
    //   console.log(state);
    //   this.state = state;
    //   //if (state.currentTime) this.sliderv.next(state.currentTime);
    // });
    this.subState = this.state$.subscribe((ev) => {
      if (ev.canplay && this.isPreloader) {
        this.isPreloader = false;
      }
    });
  }

  ngOnDestroy() {
    this.stop();
    //  this.resetStereoPlayerState();
    //  this.playStreamSubscription?.unsubscribe();
    this.audioService.showStereoPlayer$.next(false);
    // this.getStateSubscription?.unsubscribe();
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe();
  }

  openFile(file: Song) {
    //console.log(this.state);
    this.isPreloader = true;
    this.currentFile = file;
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
    // if (this.currentFile && this.currentFile.index && this.openCurrentFile) {
    //   const index = this.currentFile.index + 1;
    //   const file = this.files[index];
    //   this.openCurrentFile(file);
    // }
  }

  previous() {
    this.store.dispatch(new SelectPrev());
    // if (this.currentFile && this.currentFile.index && this.openCurrentFile) {
    //   const index = this.currentFile.index - 1;
    //   const file = this.files[index];
    //   this.openCurrentFile(file);
    // }
  }

  backward(currentTime: number | undefined) {
    this.audioService.seekTo(Number(currentTime) - this.REWIND_STEP);
  }

  forward(currentTime: number | undefined) {
    this.audioService.seekTo(Number(currentTime) + this.REWIND_STEP);
  }

  // isFirstPlaying() {
  //   if (this.currentFile) {
  //     return this.currentFile.index === 0;
  //   } else {
  //     return;
  //   }
  // }

  // isLastPlaying() {
  //   if (this.currentFile) {
  //     return this.currentFile.index === this.files.length - 1;
  //   } else {
  //     return;
  //   }
  // }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSliderChangeEnd(event: any) {
    const sliderValue = event.target.value;
    this.audioService.seekTo(sliderValue);
  }

  // resetStereoPlayerState() {
  //   this.state.playing = false;
  //   this.state.currentTime = 0;
  //   this.state.readableCurrentTime = this.audioService.formatTime(0);
  //   this.state.duration = 0;
  //   this.state.readableDuration = this.audioService.formatTime(0);
  // }
}
