import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MultichanelAudioService} from "../../../../../shared/services/audio/multichanel-audio.service";
import {IAudioData} from "../../../../../shared/interfaces/audio-data.interface";
import {MultichannelStreamStateInterface} from "../../../../../shared/interfaces/multichannel-stream-state.interface";

@Component({
  selector: 'app-multichanel-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multichanel-player.component.html',
  styleUrls: ['./multichanel-player.component.scss']
})
export class MultichanelPlayerComponent implements OnInit{
  @Input() files: IAudioData[] = [];
  @Input() currentFile: IAudioData | null = null;
  secondsToRewindTrack: number = 5;
  multiChanelStates!: MultichannelStreamStateInterface[];

  constructor(private multiChanelAudioService: MultichanelAudioService) {
  }

  ngOnInit() {
    this.multiChanelAudioService.getMultichannelState()
      .subscribe(states => {
        this.multiChanelStates = states;
      });
  }

  playStream(urls: string[]){
    this.multiChanelAudioService.playStreamAll(urls).subscribe();
  }

  openFile(file: IAudioData) {
    this.currentFile = file;
    this.multiChanelAudioService.stopAll();
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
