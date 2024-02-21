export interface PlayerSong {
  title: string;
  stereo: string;
  channels: string[];
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
export interface Song1 {
  id: string;
  title: string;
  recording_date: string;
  performers: string;
  collectors: string;
  source: string;
  location: {
    id: string;
    country: string;
    region: string;
    district_center: string;
    administrative_code: string;
    ethnos: string;
    ethnographic_district: string;
    city_ua: string;
    city_eng: string;
    unofficial_name_city: string;
    recording_location: string;
    coordinates: string;
  };
  archive_eng: string;
  archive_ua: string;
  details: {
    id: string;
    incipit: string;
    genre_cycle: string;
    poetic_text_genre: string;
    texture: string;
  };
  media: {
    id: string;
    stereo_audio: string;
    multichannel_audio1: string;
    multichannel_audio2: string;
    multichannel_audio3: string;
    multichannel_audio4: string;
    multichannel_audio5: string;
    multichannel_audio6: string;
    video_file: string;
    text: string;
    photo_of_performers: string;
    notes: string;
    melogeographical_data: string;
  };
}
