export interface PlayerSong {
  id: number;
  title: string;
  stereo: string;
  channels: string[];
}
export interface PlaylistCardSong{
  id: number;
  title: string;
  genres: string[];
  stereo_audio: string;
  // channels: string[];
  city: string;
}

export interface PlaylistSong {
  id: number;
  title: string;
  song_text: string;
  collectors: string[];
  recording_date: string;
  stereo_audio: string;
  video_url: string;
  ethnographic_district: string;
  photos: string[];
  city: string;
  genres: string[];
  education_genres: string[];
  fund: string;
}

export interface Song {
  id: number;
  title: string;
  song_text: string;
  genres: string[];
  video_url: string;
  location: string;
  ethnographic_district: string;
  collectors: string[];
  performers: string;
  recording_date: string;
  photos: string[];
  stereo_audio: string;
  multichannels: string[];
}
