import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {AudioDataInterface} from "../../../../shared/interfaces/audio-data.interface";
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

  @ViewChild('slider', { static: true }) slider!: ElementRef;

  files: AudioDataInterface[] = [];
  spotifyFiles: any = [];
  state!: StreamStateInterface;
  secondsToRewindTrack: number = 5;
  currentFile: AudioDataInterface = {
    url: '',
    name: '',
    artist: '',
    index: 0
  };
  constructor(private _translate: TranslateService,
              private audioService: AudioService,
              private cloudService: CloudService,
              ) {

  }


  ngOnInit() {
    // get media files
    this.cloudService.getSpotify().subscribe(data => {
      this.spotifyFiles = data.tracks;


      console.log(this.spotifyFiles);


      // this.files.forEach((item: AudioDataInterface, index: number) => item.index = index);

      // console.log(this.files);

      // this.openFile(this.files[0]);

      this.playStream(this.spotifyFiles[0].preview_url);

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

  openFile(file: AudioDataInterface) {
    this.currentFile = file;
    this.audioService.stop();
    this.playStream(file.url);
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
      const index = this.currentFile.index + 1;
      const file = this.files[index];
      this.openFile(file);

  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file);
  }

  backward(value: string) {
    this.audioService.seekTo(Number(value) - this.secondsToRewindTrack);
  }

  forward(value: string) {
    this.audioService.seekTo(Number(value) + this.secondsToRewindTrack);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSliderChangeEnd(event: any) {
    const sliderValue = event.target.value;
    this.audioService.seekTo(sliderValue);
  }

}
