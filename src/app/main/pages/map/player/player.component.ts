import { Component, OnInit } from '@angular/core';
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

  serverStaticImgPath: string = './assets/img/player/';
  files: IAudioData[] = [];
  spotifyFiles!: any;
  state!: StreamStateInterface;
  secondsToRewindTrack: number = 5;
  currentFile: IAudioData | null = null;
  constructor(private _translate: TranslateService,
              private audioService: AudioService,
              private cloudService: CloudService,
              ) {

  }


  ngOnInit() {
    // get media files

    this.cloudService.getSpotify().subscribe(data => {
      // console.log(data);
      this.spotifyFiles = data.tracks;
    })


    // this.cloudService.getAudioData().subscribe(data => {
    //
    //   console.log(data);
    //
    //   this.files = data;
    //
    //   this.files.forEach((item: IAudioData, index: number) => item.index = index);
    //
    //
    // });

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
    // this.slider.
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
  onSliderChangeEnd(event: any) {
    const sliderValue = event.target.value;
    this.audioService.seekTo(sliderValue);
  }

}
