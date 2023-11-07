export interface ScienceCategory {
  title: string;
  aboutCycle1: string;
  aboutCycle2: string;
  subcategories: ScienceSubcategory[];
}

export interface ScienceSubcategory {
  title: string;
  urlImg?: string;
  links: string[];
}
