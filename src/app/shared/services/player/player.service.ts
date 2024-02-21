import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';
import { PlayerSong } from '../../interfaces/song.interface';

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
    const songData = song as { title: string; stereo_audio: string; multichannels: string[] };
    const channels = songData.multichannels ? songData.multichannels : [];
    return {
      title: songData.title,
      stereo: songData.stereo_audio,
      channels: [...channels]
    };
  }
}
