export interface EducationSong {
  id: number;
  title: string;
  stereo_audio: string;
  photos: [];
  recording_location: string;
  genre: string;
}

export interface ScienceSong {
  id: 6;
  genres: string[];
  title: string;
  stereo_audio: string;
  song_text: string;
  song_description: string;
  location: string;
  ethnographic_district: string;
  collectors: string;
  performers: string;
  video_url: string;
  comment_map: string;
  map_photo: string;
  photos: [];
}
