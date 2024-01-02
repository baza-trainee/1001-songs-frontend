export interface Article {
  id: number;
  title: string;
  text: string[];
  images: string[];
  location: string;
  eventDate: string;
  authors: Author[];
  category: string;
  date: string;
}
export interface DataArticle {
  id: number;
  type_of_news: string;
  date: string;
  news_title: string;
  location: string;
  photo: string;
}

export interface Author {
  seekers: string[];
  editor: string;
  video: string;
  records: string;
}

