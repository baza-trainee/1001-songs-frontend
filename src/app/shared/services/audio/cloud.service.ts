import { Injectable } from '@angular/core';
import {AudioDataInterface} from "../../interfaces/audio-data.interface";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor(private http: HttpClient) {
  }

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSpotify(): Observable<any>{
    const apiUrl = 'https://spotify23.p.rapidapi.com/recommendations/';

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '555905e0a8mshe40e263cd9a87ccp1c3416jsn88187977c2a2',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    });

    const params = new HttpParams()
      .set('limit', '20')
      .set('seed_tracks', '0c6xIDDpzE81m2q797ordA')
      .set('seed_artists', '4NHQUGzhtTLFvgF5SZesLK')
      .set('seed_genres', 'classical,country');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any>(apiUrl, { headers, params });
  }

}
