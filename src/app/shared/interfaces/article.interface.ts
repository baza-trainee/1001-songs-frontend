export interface Article {
    id: number;
    news_title: string;
    type_of_news: string;
    date: string;
    location: string;
    photo_1: string;
    text_1: string;
    photo_2: string;
    text_2: string;
    author: string;
    editor: string;
    svitliny: string;
}

export interface NewsArticle {
    id: number;
    title: string;
    short_description: string;
    preview_photo: string;
    created_at: string;
    category: {
        id: number;
        name: string;
    };
    location: string;
    content: string;
    authors: string[];
    editors: string[];
    photographers: string[];
}

export interface NewsItem {
    id: number;
    title: string;
    short_description: string;
    preview_photo: string;
    created_at: string;
    category: {
        id: number;
        name: string;
    };
    location: string;
}

export interface NewsResponse {
    items: NewsItem[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface NewsCategory {
    id: number;
    name: string;
}
