export interface Article {
  id: number,
  title: string,
  text: string [],
  images: string[],
  location: string,
  eventDate: string,
  authors: Author[],
  category: string,
  date?: string
}

export interface Author {
  seekers: string [],
  editor: string,
  video: string,
  records:string
}
