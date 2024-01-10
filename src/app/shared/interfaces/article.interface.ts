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
  news_title: string;
  date: string;
  location: string;
  photo1: string;
  text1: string;
  photo2: string;
  text2: string;
  author: string;
  editor: string;
  news: number;
  photos: [];
}

export interface DataNews {
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

