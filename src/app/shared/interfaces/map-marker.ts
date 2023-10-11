export interface Marker {
  key: string;
  position: { lat: number; lng: number };
  popup: {
    title: string;
    photoUrl: string;
    countRecords: number;
    link: string;
  };
}

export interface FilteredOptions {
  name: string,
  selectedOptions: string[]
}
export interface SelectedOptions {
  country: string[];
  region: string[];
  district_center: string[];
  title: string[];
  genre_cycle: string[];
  found: string[];
}
export interface FilterSong {
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
