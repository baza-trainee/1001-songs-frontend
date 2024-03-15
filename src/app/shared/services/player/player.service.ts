import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';
import { PlayerSong, PlaylistCardSong, PlaylistSong } from '../../interfaces/song.interface';
import { EducationSong } from '../../interfaces/science-song.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  findNextWithAudio(currentSong: PlaylistSong, songs: PlaylistSong[]): PlaylistSong {
    const localSong = songs.find((el) => el.id === currentSong.id);
    let currentIndex = localSong ? songs.indexOf(localSong) : -1;

    let nextSong = null;
    if (currentIndex + 1 === songs.length) {
      nextSong = currentSong;
      return nextSong;
    }
    while (!nextSong) {
      currentIndex++;
      const newSong = songs[currentIndex];
      if (newSong.stereo_audio) {
        nextSong = newSong;
        return newSong;
      }
    }
    nextSong = currentSong;
    return nextSong;
  }

  findPreviousWithAudio(currentSong: PlaylistSong, songs: PlaylistSong[]): PlaylistSong {
    let currentIndex = songs.indexOf(currentSong);
    let nextSong = null;
    if (currentIndex === 0) {
      nextSong = currentSong;
      return nextSong;
    }
    while (!nextSong) {
      currentIndex--;
      const newSong = songs[currentIndex];
      if (newSong.stereo_audio) {
        nextSong = newSong;
        return newSong;
      }
    }
    nextSong = currentSong;
    return nextSong;
  }

  fetchSongs() {
    return this.http.get(`${API_URL}${StatEndpoints.markers}/${StatEndpoints.filter}/${StatEndpoints.songs}`);
  }

  fetchSongById(id: number) {
    return this.http.get(`${API_URL}${StatEndpoints.markers}/${StatEndpoints.filter}/${StatEndpoints.songs}/${id}`);
  }

  getPlayerSong<T>(song: T): PlayerSong {
    const songData = song as { id: number; title: string; stereo_audio: string; multichannels: string[] };
    const channels = songData.multichannels ? songData.multichannels : [];
    return {
      id: songData.id,
      title: songData.title,
      stereo: songData.stereo_audio,
      channels: [...channels]
    };
  }

  getPlayerListCardSong(song: EducationSong): PlaylistCardSong {
    return {
      id: song.id,
      title: song.title,
      genres: [song.genres],
      stereo_audio: song.stereo_audio,
      city: song.recording_location
    };
  }
}
