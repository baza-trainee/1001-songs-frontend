import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultichanelAudioService } from '../../../../../shared/services/audio/multichanel-audio.service';
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

@Component({
  selector: 'app-multichanel-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multichanel-player.component.html',
  styleUrls: ['./multichanel-player.component.scss']
})
export class MultichanelPlayerComponent implements OnInit, OnDestroy {
  private REWIND_STEP: number = 5;

 // @Input() files: IAudioData[] = [];
 // @Input() currentFile: IAudioData | null = null;
  // @Input() openCurrentFile!: (file: IAudioData) => void;
 // @Input() nextSong!: () => void;
  //@Input() previousSong!: () => void;
 // @ViewChild('stereoPlayer') stereoPlayer!: ElementRef;
 // secondsToRewindTrack: number = 5;
  isPreloader = false;
  // multiChanelStates: MultichannelStreamStateInterface[] = [
  //   {
  //     playing: false,
  //     muted: false,
  //     readableCurrentTime: '',
  //     readableDuration: '',
  //     duration: undefined,
  //     currentTime: undefined,
  //     canplay: false,
  //     error: false
  //   }
  // ];

  showMultichanelPlayer: boolean = false;
  @Select(PlaylistState.getSelectedSong) selectedSong$?: Observable<Song>;
  state$: Observable<StreamState[]>;

  constructor(
    private multiChanelAudioService: MultichanelAudioService,
    private audioService: AudioService,
    private cloudService: CloudService,
    private store: Store
  ) {
    this.state$ = this.multiChanelAudioService.getMultichannelState();
    // console.log('constructor');
    // this.multiChanelAudioService.showMultichanelPlayerSubject.subscribe((showMultichanelPlayer) => {
    //   //this.showMultichanelPlayer = showMultichanelPlayer;
    // });
  }

  ngOnInit() {
    this.selectedSong$?.subscribe((song) => {
      console.log(song);
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

      // console.log('states-> ', states);
    });
  }

  ngOnDestroy() {
    this.stop();
    // this.multiChanelAudioService.showMultichanelPlayerSubject.next(false);
  }

  playStream(urls: string[]) {
    this.multiChanelAudioService.playStreamAll(urls).subscribe();
  }

  openFile(file: Song) {
    //  this.currentFile = file;
    this.audioService.stop();
    this.multiChanelAudioService.stopAll();
    // this.audioService.showStereoPlayer$.next(false);
    //  this.multiChanelAudioService.showMultichanelPlayerSubject.next(true);
    const urls = file.media.multichannel_audio.map((url) => this.cloudService.preparateGoogleDriveFileUrl(url));
    this.playStream(urls);
  }

  muteToggle(index: number) {
    this.multiChanelAudioService.toggleMute(index);
  }

  pause() {
    this.multiChanelAudioService.pause();
  }

  play() {
    this.multiChanelAudioService.play();
  }

  stop() {
    this.multiChanelAudioService.stopAll();
  }

  next() {
    this.store.dispatch(new SelectNext());
    // this.nextSong();
  }

  previous() {
    this.store.dispatch(new SelectPrev());
    //this.previousSong();
  }

  backward(value: string) {
    this.multiChanelAudioService.seekTo(Number(value) - this.REWIND_STEP);
  }

  forward(value: string) {
    this.multiChanelAudioService.seekTo(Number(value) + this.REWIND_STEP);
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
    this.multiChanelAudioService.seekTo(sliderValue);
  }
}
