export default interface Iexpediton {
  id: string;
  name: string;
  shortDescription: string;
  mediaSrc: string;
  eventDate: Date | string;
  location: string;
}

export interface Expedition {
  id: number;
  title: string;
  location: string;
  short_description: string;
  expedition_date: string;
  preview_photo: string;
}
export interface ArticleExpedition {
  id: string;
  title: string;
  date_event: string | Date;
  brief_description: string;
  location: string;
  type_expedition: string;
  coordinates: string;
  text_1: string;
  video_1: string;
  text_2: string;
  text_3: string;
  text_4: string;
  text_5: string;
  photo: string;
  comment_to_photo: string;
  text_6: string;
  video_2: string;
  comment_to_video_2: string;
  text_7: string;
  video_3: string;
  comment_to_video_3: string;
  text_8: string;
  video_4: string;
  comment_to_video_4: string;
  text_9: string;
  text_10: string;
  collectors: string;
  editor: string;
  video_inst: string;
  record: string;
}
