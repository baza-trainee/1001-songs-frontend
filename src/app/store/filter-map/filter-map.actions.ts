import { Marker, MarkerOfLocation, SongFilter } from '../../shared/interfaces/map-marker';

export class UpdateOptions {
  static readonly type = '[Filter Map] Update Show Options';

  constructor(
    public selectedOptions: SongFilter,
    public optionName: keyof SongFilter
  ) {}
}
export class LoadFilteredMarkers {
  static readonly type = '[Filter Map] Load Filtered Markers';

  constructor(public markers: MarkerOfLocation[]) {}
}
export class FilterSongs {
  static readonly type = '[Filter Map] Filter songs';

  constructor(public filter: SongFilter) {}
}

export class InitFilterOptions {
  static readonly type = '[Filter Map] Init filter options';

  constructor() {}
}
