export interface GenreSubCategory {
  title: string;
  query: string;
}

export interface GenreGroup {
  title: string;
  subCategories: GenreSubCategory[];
}

export interface ScienceCategory {
  title: string;
  url: string;
  routerLink: string;
  genreGroups: GenreGroup[];
}


// export interface ScienceSubcategory {
//   title: string;
//   urlImg?: string;
//   links: string[];
// }
