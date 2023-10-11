import { Injectable } from '@angular/core';
import { IAudioData } from '../../interfaces/audio-data.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Song } from '../../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  constructor(private http: HttpClient) {}

  files: IAudioData[] = [
    {
      id: 1,
      title: '',
      recording_date: '',
      performers: '',
      collectors: '',
      source: '',
      location: {
        id: 1,
        country: '',
        region: '',
        district_center: '',
        administrative_center: '',
        ethnicity: '',
        ethnographic_district: '',
        official_name: '',
        unofficial_name: '',
        recording_location: ''
      },
      details: {
        id: 1,
        incipit: '',
        genre_cycle: '',
        poetic_text_genre: '',
        texture: ''
      },
      media: {
        id: 1,
        stereo_audio: './assets/music/tiesto1.mp3',
        multichannel_audio: [],
        video_file: '',
        text: '',
        image: ''
      }
    },
    {
      id: 2,
      title: '',
      recording_date: '',
      performers: '',
      collectors: '',
      source: '',
      location: {
        id: 2,
        country: '',
        region: '',
        district_center: '',
        administrative_center: '',
        ethnicity: '',
        ethnographic_district: '',
        official_name: '',
        unofficial_name: '',
        recording_location: ''
      },
      details: {
        id: 2,
        incipit: '',
        genre_cycle: '',
        poetic_text_genre: '',
        texture: ''
      },
      media: {
        id: 2,
        stereo_audio: '',
        multichannel_audio: [
          './assets/music/mc_song/chanel01.mp3',
          './assets/music/mc_song/chanel02.mp3',
          './assets/music/mc_song/chanel03.mp3'
        ],
        video_file: '',
        text: '',
        image: ''
      }
    },
    {
      id: 3,
      title: '',
      recording_date: '',
      performers: '',
      collectors: '',
      source: '',
      location: {
        id: 3,
        country: '',
        region: '',
        district_center: '',
        administrative_center: '',
        ethnicity: '',
        ethnographic_district: '',
        official_name: '',
        unofficial_name: '',
        recording_location: ''
      },
      details: {
        id: 3,
        incipit: '',
        genre_cycle: '',
        poetic_text_genre: '',
        texture: ''
      },
      media: {
        id: 3,
        stereo_audio: '',
        multichannel_audio: [
          './assets/music/mc_song/chanel01.mp3',
          './assets/music/mc_song/chanel02.mp3',
          './assets/music/mc_song/chanel03.mp3'
        ],
        video_file: '',
        text: '',
        image: ''
      }
    },
    {
      id: 4,
      title: '',
      recording_date: '',
      performers: '',
      collectors: '',
      source: '',
      location: {
        id: 4,
        country: '',
        region: '',
        district_center: '',
        administrative_center: '',
        ethnicity: '',
        ethnographic_district: '',
        official_name: '',
        unofficial_name: '',
        recording_location: ''
      },
      details: {
        id: 4,
        incipit: '',
        genre_cycle: '',
        poetic_text_genre: '',
        texture: ''
      },
      media: {
        id: 4,
        stereo_audio: '',
        multichannel_audio: [],
        video_file: '',
        text: '',
        image: ''
      }
    },
    {
      id: 5,
      title: '',
      recording_date: '',
      performers: '',
      collectors: '',
      source: '',
      location: {
        id: 5,
        country: '',
        region: '',
        district_center: '',
        administrative_center: '',
        ethnicity: '',
        ethnographic_district: '',
        official_name: '',
        unofficial_name: '',
        recording_location: ''
      },
      details: {
        id: 5,
        incipit: '',
        genre_cycle: '',
        poetic_text_genre: '',
        texture: ''
      },
      media: {
        id: 5,
        stereo_audio: '',
        multichannel_audio: [
          './assets/music/mc_song_2/01.mp3',
          './assets/music/mc_song_2/02.mp3',
          './assets/music/mc_song_2/03.mp3',
          './assets/music/mc_song_2/04.mp3',
          './assets/music/mc_song_2/05.mp3',
          './assets/music/mc_song_2/06.mp3'
        ],
        video_file: '',
        text: '',
        image: ''
      }
    }
  ];

  getFiles() {
    return of(this.files);
  }

  getSongsByLocation(locationName: string): Observable<Song[]> {
    return this.http.get<Song[]>(`https://song-0gm4.onrender.com/api/v1/songs_location/?location=${locationName}`);
  }

  getAudioData(): Observable<IAudioData[]> {
    return this.http.get<IAudioData[]>(environment.api + 'songs');
  }

  preparateGoogleDriveFileUrl(url: string) {
    const fileId = url.split('/').reverse()[1];
    // console.log(fileId)
    return `https://docs.google.com/uc?export=load&id=${fileId}`;
  }
}
