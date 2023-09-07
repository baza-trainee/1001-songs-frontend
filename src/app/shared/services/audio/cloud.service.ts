import { Injectable } from '@angular/core';
import {AudioDataInterface} from "../../interfaces/audio-data.interface";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  files: AudioDataInterface[] = [
    // tslint:disable-next-line: max-line-length
    {
      index: 0,
      url: "./assets/music/alan_walker.mp3",
      name: "Perfect",
      artist: " Ed Sheeran"
    },
    {
      // tslint:disable-next-line: max-line-length
      index: 1,
      url: "./assets/music/tiesto1.mp3",
      name: "Man Atkeya Beparwah",
      artist: "Nusrat Fateh Ali Khan"
    },
    {
      index: 2,
      url: "./assets/music/tiesto2.mp3",
      name: "Penny Lane",
      artist: "The Beatles"
    }
  ];

  getFiles() {
    return of(this.files);
  }
}
