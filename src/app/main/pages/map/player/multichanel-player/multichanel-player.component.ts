import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MultiAudioService } from '../../../../../shared/services/audio/multichanel-audio.service';
import { IAudioData } from '../../../../../shared/interfaces/audio-data.interface';
//import { MultichannelStreamStateInterface } from '../../../../../shared/interfaces/multichannel-stream-state.interface';
import { AudioService } from '../../../../../shared/services/audio/audio.service';
import { Select, Store } from '@ngxs/store';
import { PlaylistState } from 'src/app/store/playlist/playlist.state';
import { Observable, skip } from 'rxjs';
import { Song } from 'src/app/shared/interfaces/song';
import { CloudService } from 'src/app/shared/services/audio/cloud.service';
import { SelectNext, SelectPrev } from 'src/app/store/playlist/playlist.actions';
import { StreamState } from 'src/app/shared/interfaces/stream-state.interface';
import { MultiAudioService } from 'src/app/shared/services/audio/multi-audio.service';

@Component({
  selector: 'app-multichanel-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multichanel-player.component.html',
  styleUrls: ['./multichanel-player.component.scss']
})
export class MultichanelPlayerComponent implements OnInit, OnDestroy {
  private REWIND_STEP: number = 5;

  isPreloader = false;

  showMultichanelPlayer: boolean = false;
  @Select(PlaylistState.getSelectedSong) selectedSong$?: Observable<Song>;
  state$: Observable<StreamState[]>;

  constructor(
    private multiAudioService: MultiAudioService,
    private audioService: AudioService,
    private cloudService: CloudService,
    private store: Store
  ) {
    this.state$ = this.multiAudioService.getMultichannelState();
  }

  ngOnInit() {
    this.selectedSong$?.subscribe((song) => {
      //console.log(song);
      if (song.media && song.media.multichannel_audio.length > 1) {
        //  console.log(song);
        this.openFile(song);
        this.isPreloader = true;
        this.showMultichanelPlayer = true;
      } else {
        this.showMultichanelPlayer = false;
      }
    });

    this.state$.pipe(skip(1)).subscribe((states) => {
      if (states[0].playing && this.isPreloader) {
        this.isPreloader = false;
      }
    });
  }

  ngOnDestroy() {
    this.stop();
  }

  playStream(urls: string[]) {
    this.multiAudioService.playStreamAll(urls).subscribe();
  }

  openFile(file: Song) {
    //  this.currentFile = file;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSliderChangeEnd(event: any) {
    const sliderValue = event.target.value;
    this.multiAudioService.seekTo(sliderValue);
  }
}
