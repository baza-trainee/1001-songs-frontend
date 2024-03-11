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
    category: Category;
    location: string;
}

export interface NewsResponse {
    items: NewsItem[];
    total: number;
    page: number;
    size: number;
    pages: number;
}

export interface Category {
    id: number;
    name: string;
}
