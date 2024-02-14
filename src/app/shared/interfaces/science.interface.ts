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

export interface EducationPrimaryCategory {
  id: 0;
  title: string;
  description: string;
  recommended_sources: string[];
  song_subcategories: [
    {
      id: string;
      title: string;
      media: string;
      education_genres: [
        {
          id: number;
          title: string;
        }
      ];
    }
  ];
}

export interface EducationCategoryCard {
  id: string;
  title: string;
  media: string;
  // routerLink: string;
}

export interface EducationGenre {
  id: 0;
  title: string;
  media: string[];
  descriptio: string;
}

// export interface SongsPrimaryCategory {
//   id: 0;
//   title: string;
//   description: string;
//   photo1: string;
//   photo2: string;
//   photo3: string;
//   photo4: string;
//   photo5: string;
// }

// export interface ScienceSubcategory {
//   title: string;
//   urlImg?: string;
//   links: string[];
// }
