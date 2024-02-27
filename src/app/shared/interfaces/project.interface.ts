export interface Project {
    id: number;
    title: string;
    location: string;
    project_date: string;
    content: string;
    authors: string[];
    editors: string[];
    photographers: string[];
    recording: string[];
}
export interface ProjectData {
  items: ProjectItem[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ProjectItem {
  id: number;
  title: string;
  short_description: string;
  preview_photo: string;
}
