export class SongFilter {
  country: string[] = [];
  region: string[] = [];
  settlement: string[] = [];
  title: string[] = [];
  genre: string[] = [];
  found: string[] = [];
}

export interface Marker {
  id: string;
  title: string;
  genre_cycle: string;
  found: string;
  image: string;
  location: {
    country: string;
    region: string;
    district_center: string;
    recording_location: { lat: number; lng: number };
  };
}
