import { Injectable } from '@angular/core';
import {IAudioData} from "../../interfaces/audio-data.interface";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor(private http: HttpClient) {
  }

  files: IAudioData[] = [
    {
      id: 1,
      title: "",
      recording_date: "",
      performers: "",
      collectors: "",
      source: "",
      location: {
        id: 1,
        country: "",
        region: "",
        district_center: "",
        administrative_center: "",
        ethnicity: "",
        ethnographic_district: "",
        official_name: "",
        unofficial_name: "",
        recording_location: ""
      },
      details: {
        id: 1,
        incipit: "",
        genre_cycle: "",
        poetic_text_genre: "",
        texture: ""
      },
      media: {
        id: 1,
        stereo_audio: "./assets/music/alan_walker.mp3",
        multichannel_audio: [],
        video_file: "",
        text: "",
        image: ""
      }
    },
    {
      id: 2,
      title: "",
      recording_date: "",
      performers: "",
      collectors: "",
      source: "",
      location: {
        id: 2,
        country: "",
        region: "",
        district_center: "",
        administrative_center: "",
        ethnicity: "",
        ethnographic_district: "",
        official_name: "",
        unofficial_name: "",
        recording_location: ""
      },
      details: {
        id: 2,
        incipit: "",
        genre_cycle: "",
        poetic_text_genre: "",
        texture: ""
      },
      media: {
        id: 2,
        stereo_audio: "./assets/music/tiesto1.mp3",
        multichannel_audio: [],
        video_file: "",
        text: "",
        image: ""
      }
    },
    {
      id: 3,
      title: "",
      recording_date: "",
      performers: "",
      collectors: "",
      source: "",
      location: {
        id: 3,
        country: "",
        region: "",
        district_center: "",
        administrative_center: "",
        ethnicity: "",
        ethnographic_district: "",
        official_name: "",
        unofficial_name: "",
        recording_location: ""
      },
      details: {
        id: 3,
        incipit: "",
        genre_cycle: "",
        poetic_text_genre: "",
        texture: ""
      },
      media: {
        id: 3,
        stereo_audio: "",
        multichannel_audio: [
          "./assets/music/mc_song/chanel01.mp3",
          "./assets/music/mc_song/chanel02.mp3",
          "./assets/music/mc_song/chanel03.mp3"
        ],
        video_file: "",
        text: "",
        image: ""
      }
    },
  ];

  getFiles() {
    return of(this.files);
  }

  getAudioData(): Observable<IAudioData[]>{
    return this.http.get<IAudioData[]>(environment.api + 'songs');
  }

}
