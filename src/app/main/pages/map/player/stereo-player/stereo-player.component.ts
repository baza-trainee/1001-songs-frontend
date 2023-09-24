import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IAudioData} from "../../../../../shared/interfaces/audio-data.interface";
import {StreamStateInterface} from "../../../../../shared/interfaces/stream-state.interface";
import {AudioService} from "../../../../../shared/services/audio/audio.service";

@Component({
  selector: 'app-stereo-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stereo-player.component.html',
  styleUrls: ['./stereo-player.component.scss']
})
export class StereoPlayerComponent implements OnInit{
  @Input() files: IAudioData[] = [];
  @Input() currentFile: IAudioData | null = null;
  secondsToRewindTrack: number = 5;
  state!: StreamStateInterface;

  constructor(private audioService: AudioService,
              ) {
  }

  ngOnInit() {

    // listen to stream state
    this.audioService.getState()
      .subscribe(state => {
        this.state = state;
      });
  }


  playStream(url: string) {
    this.audioService.playStream(url).subscribe();
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


}
