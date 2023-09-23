export interface IAudioData {
  index?: number,
  isDetailOpen?: boolean,
  id: number,
  title: string,
  recording_date: string,
  performers: string,
  collectors: string,
  source: string,
  location: {
    id: number,
    country: string,
    region: string,
    district_center: string,
    administrative_center: string,
    ethnicity: string,
    ethnographic_district: string,
    official_name: string,
    unofficial_name: string,
    recording_location: string
  },
  details: {
    id: number,
    incipit: string,
    genre_cycle: string,
    poetic_text_genre: string,
    texture: string
  },
  media: {
    id: number,
    stereo_audio: string,
    multichannel_audio: string[],
    video_file: string,
    text: string,
    image: string
  }
}
