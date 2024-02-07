export interface GenreSubCategory {
  title: string;
  query: string;
}

export interface GenreGroup {
  title: string;
  genres: GenreSubCategory[];
}

export interface ScienceCategory {
  title: string;
  url: string;
  routerLink: string;
  genreGroups: GenreGroup[];
}

export interface SongsCycle {
  id: 0;
  title: string;
  description: string;
  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
  photo5: string;
}

// export interface ScienceSubcategory {
//   title: string;
//   urlImg?: string;
//   links: string[];
// }
