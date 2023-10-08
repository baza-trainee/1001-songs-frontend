import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MultichanelAudioService} from "../../../../../shared/services/audio/multichanel-audio.service";
import {IAudioData} from "../../../../../shared/interfaces/audio-data.interface";
import {MultichannelStreamStateInterface} from "../../../../../shared/interfaces/multichannel-stream-state.interface";
import {AudioService} from "../../../../../shared/services/audio/audio.service";

@Component({
  selector: 'app-multichanel-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multichanel-player.component.html',
  styleUrls: ['./multichanel-player.component.scss']
})
export class MultichanelPlayerComponent implements OnInit, OnDestroy{
  @Input() files: IAudioData[] = [];
  @Input() currentFile: IAudioData | null = null;
  @Input() openCurrentFile!: (file: IAudioData) => void;
  @Input() nextSong!: () => void;
  @Input() previousSong!: () => void;
  @ViewChild('stereoPlayer') stereoPlayer!: ElementRef;
  secondsToRewindTrack: number = 5;
  multiChanelStates!: MultichannelStreamStateInterface[];

  showMultichanelPlayer: boolean = false;

  constructor(private multiChanelAudioService: MultichanelAudioService,
              private audioService: AudioService,) {

    this.multiChanelAudioService.showMultichanelPlayerSubject.subscribe(showMultichanelPlayer => {
      this.showMultichanelPlayer = showMultichanelPlayer;
    });
  }

  ngOnInit() {
    this.multiChanelAudioService.getMultichannelState()
      .subscribe(states => {
        this.multiChanelStates = states;
      });
  }

  ngOnDestroy() {
    this.stop();
    this.multiChanelAudioService.showMultichanelPlayerSubject.next(false);
  }

  playStream(urls: string[]){
    this.multiChanelAudioService.playStreamAll(urls).subscribe();
  }

  openFile(file: IAudioData) {
    this.currentFile = file;
    this.audioService.stop();
    this.multiChanelAudioService.stopAll();
    this.audioService.showStereoPlayer$.next(false);
    this.multiChanelAudioService.showMultichanelPlayerSubject.next(true);
    this.playStream(file.media.multichannel_audio);
  }

  muteToggle(index: number){
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
    this.nextSong();
  }

  previous() {
    this.previousSong();
  }

  backward(value: string) {
    this.multiChanelAudioService.seekTo(Number(value) - this.secondsToRewindTrack);
  }

  forward(value: string) {
    this.multiChanelAudioService.seekTo(Number(value) + this.secondsToRewindTrack);
  }

  isFirstPlaying() {
    if(this.currentFile) {
      return this.currentFile.index === 0;
    } else {
      return
    }
  }

  isLastPlaying() {
    if(this.currentFile) {
      return this.currentFile.index === this.files.length - 1;
    } else {
      return
    }
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSliderChangeEnd(event:  any) {
    const sliderValue = event.target.value;
    this.multiChanelAudioService.seekTo(sliderValue);
  }

}
