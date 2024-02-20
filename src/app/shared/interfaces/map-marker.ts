export class SongFilter {
  country: string[] = [];
  region: string[] = [];
  city: string[] = [];
  title: string = '';
  genre: string[] = [];
  fund: string[] = [];
}

export interface MultiSelect {
  name: string,
  id: number,
  song_count: number
}

export interface OptionsSongFilter {
  country: CountryDropdown[];
  region: RegionDropdown[];
  city: CityDropdown[];
  genre: GenreDropdown[];
  fund: FundDropdown[];
}

export interface SelectedOptionsSongFilter {
  country: number[];
  region: number[];
  city: number[];
  genre: number[];
  fund: number[];
}

export interface CountryDropdown {
  id: number,
  name: string,
  song_count: number,
}

export interface RegionDropdown {
  id: number,
  name: string,
  song_count: number,
  country_id: number
}

export interface CityDropdown {
  id: number,
  name: string,
  country_id: number,
  region_id: number,
  song_count: number
}

export interface GenreDropdown {
  id: number;
  name: string;
  song_count: number;
}

export interface FundDropdown {
  id: number;
  name: string;
  song_count: number;
}

// export interface Marker {
//   id: string;
//   img: string;
//   title: string;
//   genre_cycle: string;
//   found: string;
//   image: string;
//   location: {
//     country: string;
//     region: string;
//     district_center: string;
//     recording_location: { lat: number; lng: number };
//   };
// }

export interface MarkerOfLocation {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  song_count: number;
}
