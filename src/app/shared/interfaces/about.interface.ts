export interface DataAboutContent {
  id: number;
  title: string;
  content: string;

}

export interface AboutTeam {
  id: number;
  full_name: string;
  photo: string;
  description: string;
}

export interface Content {
  text: string
  images: string[]
}
