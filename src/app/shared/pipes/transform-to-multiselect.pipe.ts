import { Pipe, PipeTransform } from '@angular/core';
import {
  CityDropdown,
  CountryDropdown,
  FundDropdown,
  GenreDropdown,
  MultiSelect,
  RegionDropdown
} from "../interfaces/map-marker";

@Pipe({
  name: 'transformToMultiselect',
  standalone: true
})
export class TransformToMultiselectPipe implements PipeTransform {

  transform(options: CountryDropdown[] | RegionDropdown[] | CityDropdown[] | GenreDropdown[] | FundDropdown[]): MultiSelect[] {
    if (!Array.isArray(options)) {
      return [];
    }

    return options.map((option) => ({
      name: option.name || option.toString(),
      id: option.id,
      song_count: option.song_count
    }));
  }

}
