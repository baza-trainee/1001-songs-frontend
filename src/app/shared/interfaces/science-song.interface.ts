export interface Song {
  id: string;
  title: string;
  genre: string;
  text: string;
  information: string;
  details: {
    id: string;
    recording_location: string;
    ethnographic_district: string;
    author_recording: string;
    performers: string;
  };
  media: {
    id: string;
    photo_1: string;
    photo_2: string;
    audio_example: string;
    video_example: string;
    ethnographic_photo: string;
    area: string;
    comment_map: string;
  };
}
