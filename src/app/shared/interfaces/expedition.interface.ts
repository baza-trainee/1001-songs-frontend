import {Category} from "./article.interface";

export interface Expedition {
  id: number;
  title: string;
  location: string;
  short_description: string;
  expedition_date: string;
  preview_photo: string;
}

export interface ExpeditionData {
  title: string,
  description: string,
  categories: Category[]
}

export interface ExpeditionListResponse {
  items: Expedition[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ExpeditionArticle {
  id: number;
  title: string;
  location: string;
  short_description: string;
  expedition_date: string;
  map_photo: string;
  category: { id: number; name: string };
  content: string;
  authors: string[];
  editors: string[];
  photographers: string[];
  recording: string[];
}
