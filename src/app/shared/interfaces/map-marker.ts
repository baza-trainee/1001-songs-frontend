export class SongFilter {
  country: string[] = [];
  region: string[] = [];
  city: string[] = [];
  title: string = '';
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

export interface MarkerOfLocation {
  count: string;
  location__coordinates: string;
  location__city: string;
}
