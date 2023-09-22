import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {IAudioData} from "../../../../shared/interfaces/audio-data.interface";
import {StreamStateInterface} from "../../../../shared/interfaces/stream-state.interface";
import {AudioService} from "../../../../shared/services/audio/audio.service";
import {CloudService} from "../../../../shared/services/audio/cloud.service";

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
  // spotifyFiles!: any;
  state!: StreamStateInterface;
  secondsToRewindTrack: number = 5;
  currentFile: IAudioData | null = null;
  isDetailOpen: boolean = true;

  constructor(private _translate: TranslateService,
              private audioService: AudioService,
              private cloudService: CloudService,
              ) {

  }

  ngOnInit() {

    this.cloudService.getFiles().subscribe(data => {
      this.files = data;
    });

    // listen to stream state
    this.audioService.getState()
      .subscribe(state => {
        this.state = state;
      });

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
    if(this.currentFile){
      const index = this.currentFile.index + 1;
      const file = this.files[index];
      this.openFile(file);
    }
  }

  previous() {
    if(this.currentFile){
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

  toggleDetailBtn() {
    this.isDetailOpen = !this.isDetailOpen;
  }

  getScreenWidth(): void {
    this.screenWidth = window.innerWidth;
  }

  mobileToggleDetailBtn() {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 768){
      this.isDetailOpen = !this.isDetailOpen;
    }
    return
  }

}
