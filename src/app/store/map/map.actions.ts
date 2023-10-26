import { SongFilter } from '../../shared/interfaces/map-marker';

export class FetchMarkers {
  static readonly type = '[Map] Set';

  constructor() {}
}
export class FilteredMarkers {
  static readonly type = '[Map] Filter Markers';

  constructor(public options: SongFilter) {}
}
