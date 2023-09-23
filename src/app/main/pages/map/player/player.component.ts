import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {IAudioData} from "../../../../shared/interfaces/audio-data.interface";
import {StreamStateInterface} from "../../../../shared/interfaces/stream-state.interface";
import {AudioService} from "../../../../shared/services/audio/audio.service";
import {CloudService} from "../../../../shared/services/audio/cloud.service";
import {MultichannelStreamStateInterface} from "../../../../shared/interfaces/multichannel-stream-state.interface";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  screenWidth: number = 0;
  serverStaticImgPath: string = './assets/img/player/';
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';

  files: IAudioData[] = [];
  state!: StreamStateInterface;
  secondsToRewindTrack: number = 5;
  currentFile: IAudioData | null = null;

  multiChanelStates!: MultichannelStreamStateInterface[];

  private audioObjects: HTMLAudioElement[] = [];

  constructor(private _translate: TranslateService,
              private audioService: AudioService,
              private cloudService: CloudService,
              ) {

  }

  ngOnInit() {

    this.cloudService.getFiles().subscribe(data => {
      this.files = data;

      this.files.forEach((item: IAudioData, index: number) => {
        item.index = index;
        item.isDetailOpen = false;
      })
    });

    // listen to stream state
    this.audioService.getState()
      .subscribe(state => {
        this.state = state;
        console.log(this.state);
      });

  }

  playMultichannelAudio(multichannelAudioUrls: string[]) {
    this.audioObjects = this.audioService.playMultichannelAudio(multichannelAudioUrls);
  }

  playStream(url: string) {
    this.audioService.playStream(url)
      .subscribe(events => {
        // console.log(events);
      });
  }

  openFile(file: IAudioData) {
    this.currentFile = file;
    this.audioService.stop();
    if(this.currentFile.media.multichannel_audio && (this.currentFile.media.multichannel_audio.length - 1) > 0){
      this.playMultichannelAudio(this.currentFile.media.multichannel_audio);
    }else{
      this.playStream(file.media.stereo_audio);
    }
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
    if(this.currentFile && this.currentFile.index){
      const index = this.currentFile.index + 1;
      const file = this.files[index];
      this.openFile(file);
    }
  }

  previous() {
    if(this.currentFile && this.currentFile.index){
      const index = this.currentFile.index - 1;
      const file = this.files[index];
      this.openFile(file);
    }
  }

  backward(value: string) {
    this.audioService.seekTo(Number(value) - this.secondsToRewindTrack);
  }

  forward(value: string) {
    this.audioService.seekTo(Number(value) + this.secondsToRewindTrack);
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
    this.audioService.seekTo(sliderValue);
  }

  toggleDetailBtn(file: IAudioData) {
    file.isDetailOpen = !file.isDetailOpen;
  }

  mobileToggleDetailBtn(file: IAudioData) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 768){
      file.isDetailOpen = !file.isDetailOpen;
    }
    return
  }

}
