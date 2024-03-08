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
  recommended_sources: string;
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

export interface EducationSection {
  title: string;
  description: string;
  recommendations: string;
  recommended_sources: string[];
  calendar_and_ritual_categories: CalendarAndRitualCategory[];
}

export interface CalendarAndRitualCategory {
  id: number;
  title: string;
  media: string;
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
  description: string;
  main_category: {
    id: number,
    title: string
  }
}
