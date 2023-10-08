import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAudioData } from '../../../../../shared/interfaces/audio-data.interface';
import { StreamStateInterface } from '../../../../../shared/interfaces/stream-state.interface';
import { AudioService } from '../../../../../shared/services/audio/audio.service';
import { MultichanelAudioService } from '../../../../../shared/services/audio/multichanel-audio.service';
import { Observable, Subscription } from 'rxjs';
import { PlaylistState } from 'src/app/store/playlist/playlist.state';
import { Song } from 'src/app/shared/interfaces/song';
import { Select } from '@ngxs/store';
import { CloudService } from 'src/app/shared/services/audio/cloud.service';

@Component({
  selector: 'app-stereo-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stereo-player.component.html',
  styleUrls: ['./stereo-player.component.scss']
})
export class StereoPlayerComponent implements OnInit, OnDestroy {
  @Input() files: IAudioData[] = [];
  @Input() currentFile: IAudioData | null = null;
  @Input() openCurrentFile!: (file: IAudioData) => void;
  secondsToRewindTrack: number = 5;
  state!: StreamStateInterface;
  showStereoPlayer: boolean = false;
  private playStreamSubscription: Subscription | undefined;
  private getStateSubscription: Subscription | undefined;
  @Select(PlaylistState.getSelectedSong) selectedSong$?: Observable<Song>;

  constructor(
    private audioService: AudioService,
    private multiChanelAudioService: MultichanelAudioService,
    private cloudService: CloudService
  ) {
    this.audioService.showStereoPlayerSubject.subscribe((showStereoPlayer) => {
      this.showStereoPlayer = showStereoPlayer;
    });
  }

  ngOnInit() {
    this.selectedSong$?.subscribe((s) => {
      console.log(s);
      if (s.media) {
        this.playStream(this.cloudService.preparateGoogleDriveFileUrl(s.media.stereo_audio));
        //this.openFile(s)
      }
    });

    this.getStateSubscription = this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  ngOnDestroy() {
    this.stop();
    this.resetStereoPlayerState();
    this.playStreamSubscription?.unsubscribe();
    this.audioService.showStereoPlayerSubject.next(false);
    this.getStateSubscription?.unsubscribe();
  }

  playStream(url: string) {
    this.playStreamSubscription = this.audioService.playStream(url).subscribe();
  }

  openFile(file: IAudioData) {
    this.currentFile = file;
    this.multiChanelAudioService.stopAll();
    this.audioService.stop();
    this.audioService.showStereoPlayerSubject.next(true);
    this.multiChanelAudioService.showMultichanelPlayerSubject.next(false);
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
    if (this.currentFile && this.currentFile.index && this.openCurrentFile) {
      const index = this.currentFile.index + 1;
      const file = this.files[index];
      this.openCurrentFile(file);
    }
  }

  previous() {
    if (this.currentFile && this.currentFile.index && this.openCurrentFile) {
      const index = this.currentFile.index - 1;
      const file = this.files[index];
      this.openCurrentFile(file);
    }
  }

  backward(value: string) {
    this.audioService.seekTo(Number(value) - this.secondsToRewindTrack);
  }

  forward(value: string) {
    this.audioService.seekTo(Number(value) + this.secondsToRewindTrack);
  }

  isFirstPlaying() {
    if (this.currentFile) {
      return this.currentFile.index === 0;
    } else {
      return;
    }
  }

  isLastPlaying() {
    if (this.currentFile) {
      return this.currentFile.index === this.files.length - 1;
    } else {
      return;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSliderChangeEnd(event: any) {
    const sliderValue = event.target.value;
    this.audioService.seekTo(sliderValue);
  }

  resetStereoPlayerState() {
    this.state.playing = false;
    this.state.currentTime = 0;
    this.state.readableCurrentTime = this.audioService.formatTime(0);
    this.state.duration = 0;
    this.state.readableDuration = this.audioService.formatTime(0);
  }
}
