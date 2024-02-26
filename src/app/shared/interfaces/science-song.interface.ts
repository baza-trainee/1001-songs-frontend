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
  genres: Genre[];
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

export interface Genre {
  id: number;
  title: string;
  sub_category: {
    id: number;
    title: string;
  };
  main_category: {
    id: number;
    title: string;
  };
}
