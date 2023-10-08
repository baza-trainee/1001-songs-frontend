export interface Song {
  isDetailOpen?: boolean;
  index?:number;
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
    official_name_city: string;
    unofficial_name_city: string;
    recording_location: string;
  };
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
    multichannel_audio: string[];
    video_file: string;
    text: string;
    image: string;
  };
}
