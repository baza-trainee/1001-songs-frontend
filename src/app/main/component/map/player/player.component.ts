import {Component, OnInit} from '@angular/core';
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
  files: AudioDataInterface[] = [];
  state!: StreamStateInterface;
  // currentFile!: AudioDataInterface;
  constructor(private _translate: TranslateService,
              private audioService: AudioService,
              private cloudService: CloudService) {


  }


  ngOnInit() {
    // get media files
    // this.cloudService.getFiles().subscribe(files => {
    //   this.files = files;
    //
    //   this.openFile(this.files[1]);
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
        console.log(events);
      });
  }

  openFile(file: AudioDataInterface) {
    // this.currentFile = file;
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
    // const index = this.currentFile.index + 1;
    const file = this.files[2];
    this.openFile(file);
  }

  previous() {
    // const index = this.currentFile.index - 1;
    const file = this.files[1];
    this.openFile(file);
  }

  // isFirstPlaying() {
  //   return this.currentFile.index === 0;
  // }

  // isLastPlaying() {
  //   return this.currentFile.index === this.files.length - 1;
  // }

  onSliderChangeEnd(change: Event) {
    console.log(change);
    this.audioService.seekTo(change.timeStamp / 1000);
  }



}
