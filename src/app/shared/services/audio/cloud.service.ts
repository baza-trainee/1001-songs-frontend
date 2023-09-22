import { Injectable } from '@angular/core';
import {IAudioData} from "../../interfaces/audio-data.interface";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor(private http: HttpClient) {
  }

  files: IAudioData[] = [
    // tslint:disable-next-line: max-line-length
    {
      index: 0,
      id: 0,
      title: "",
      recording_date: "",
      performers: "",
      collectors: "",
      source: "",
      location: {
        id: 0,
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
        id: 0,
        incipit: "",
        genre_cycle: "",
        poetic_text_genre: "",
        texture: ""
      },
      media: {
        id: 0,
        stereo_audio: "./assets/music/alan_walker.mp3",
        multichannel_audio: "",
        video_file: "",
        text: "",
        image: ""
      }
    },
    {
      // tslint:disable-next-line: max-line-length
      index: 1,
      id: 0,
      title: "",
      recording_date: "",
      performers: "",
      collectors: "",
      source: "",
      location: {
        id: 0,
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
        id: 0,
        incipit: "",
        genre_cycle: "",
        poetic_text_genre: "",
        texture: ""
      },
      media: {
        id: 0,
        stereo_audio: "./assets/music/tiesto1.mp3",
        multichannel_audio: "",
        video_file: "",
        text: "",
        image: ""
      }
    },
  ];

  getFiles() {
    return of(this.files);
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSpotify(): Observable<any>{
    const apiUrl = 'https://spotify23.p.rapidapi.com/recommendations/';

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '555905e0a8mshe40e263cd9a87ccp1c3416jsn88187977c2a2',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    });

    const params = new HttpParams()
      .set('limit', '2')
      .set('seed_tracks', '0c6xIDDpzE81m2q797ordA')
      .set('seed_artists', '4NHQUGzhtTLFvgF5SZesLK')
      .set('seed_genres', 'classical,country');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any>(apiUrl, { headers, params });
  }
  getAudioData(): Observable<IAudioData[]>{
    return this.http.get<IAudioData[]>(environment.api + 'songs');
  }

}
