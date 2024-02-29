import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';
import { PlayerSong, PlaylistCardSong } from '../../interfaces/song.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  fetchSongs() {
    return this.http.get(`${API_URL}${StatEndpoints.markers}/${StatEndpoints.filter}/${StatEndpoints.songs}`);
  }

  fetchSongById(id: number) {
    return this.http.get(`${API_URL}${StatEndpoints.markers}/${StatEndpoints.filter}/${StatEndpoints.songs}/${id}`);
  }

  getPlayerSong<T>(song: T): PlayerSong {
    const songData = song as {id: number;  title: string; stereo_audio: string; multichannels: string[] };
    const channels = songData.multichannels ? songData.multichannels : [];
    return {
      id: songData.id,
      title: songData.title,
      stereo: songData.stereo_audio,
      channels: [...channels]
    };
  }

  getPlayerListCardSong<T>(song: T): PlaylistCardSong {
    const songData = song as PlaylistCardSong;
    return {
      id: songData.id,
      title: songData.title,
      genres: songData.genres,
      stereo_audio: songData.stereo_audio,
      city: songData.city
    };
  }
}
