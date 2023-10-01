export interface Song {
  id: 0;
  title: 'string';
  recording_date: '2023-09-19';
  performers: 'string';
  collectors: 'string';
  source: 'string';
  location: {
    id: 0;
    country: 'string';
    region: 'string';
    district_center: 'string';
    administrative_code: 'string';
    ethnos: 'string';
    ethnographic_district: 'string';
    official_name_city: 'string';
    unofficial_name_city: 'string';
    recording_location: 'string';
  };
  details: {
    id: 0;
    incipit: 'string';
    genre_cycle: 'Зима';
    poetic_text_genre: 'string';
    texture: 'string';
  };
  media: {
    id: 0;
    stereo_audio: 'string';
    multichannel_audio: 'string';
    video_file: 'string';
    text: 'string';
    image: 'string';
  };
}
