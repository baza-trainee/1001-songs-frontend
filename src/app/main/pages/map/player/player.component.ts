import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {IAudioData} from "../../../../shared/interfaces/audio-data.interface";
import {AudioService} from "../../../../shared/services/audio/audio.service";
import {CloudService} from "../../../../shared/services/audio/cloud.service";
import {StereoPlayerComponent} from "./stereo-player/stereo-player.component";
import {MultichanelPlayerComponent} from "./multichanel-player/multichanel-player.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule, StereoPlayerComponent, MultichanelPlayerComponent],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy{
  screenWidth: number = 0;
  serverStaticImgPath: string = './assets/img/player/';
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  files: IAudioData[] = [];
  currentFile!: IAudioData;
  cloudServiceSubscribe: Subscription | undefined;
  @ViewChild('stereoPlayer') stereoPlayer: StereoPlayerComponent | undefined;
  @ViewChild('multiChanelPlayer') multiChanelPlayer: MultichanelPlayerComponent | undefined;
  constructor(private _translate: TranslateService,
              private audioService: AudioService,
              private cloudService: CloudService,
              ) {
    this.audioService.showStereoPlayerSubject.next(true);
  }

  ngOnInit() {
    this.cloudServiceSubscribe = this.cloudService.getFiles().subscribe(data => {
      this.files = data;

      this.files.forEach((item: IAudioData, index: number) => {
        item.index = index;
        item.isDetailOpen = false;
        item.isStereo = item.media.stereo_audio !== '';
        item.isMultiChanel = item.media.multichannel_audio.length > 0;
      });
    });
  }

  ngOnDestroy() {
    this.cloudServiceSubscribe?.unsubscribe();
  }

  toggleDetailBtn(file: IAudioData) {
    file.isDetailOpen = !file.isDetailOpen;
  }

  openCurrentFile(file: IAudioData) {
    if(file.isStereo && this.stereoPlayer) {
      this.stereoPlayer.openFile(file);
    }
    if(file.isMultiChanel && this.multiChanelPlayer){
      this.multiChanelPlayer.openFile(file)
    }
  }

  nextSong() {
    if(this.currentFile && this.currentFile.index){
      const index = this.currentFile.index + 1;
      const file = this.files[index];
      this.openCurrentFile(file);
    }
  }

  previousSong() {
    if(this.currentFile && this.currentFile.index){
      const index = this.currentFile.index - 1;
      const file = this.files[index];
      this.openCurrentFile(file);
    }
  }

  mobileToggleDetailBtn(file: IAudioData) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 768){
      file.isDetailOpen = !file.isDetailOpen;
    }
    return
  }

}
