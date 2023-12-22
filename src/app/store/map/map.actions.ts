import { Song } from 'src/app/shared/interfaces/song.interface';
import { MarkerOfLocation, SongFilter } from '../../shared/interfaces/map-marker';

export class FetchMarkers {
  static readonly type = '[Map] Set';

  constructor() {}
}
export class FilteredMarkers {
  static readonly type = '[Map] Filter Markers';

  constructor(public options: SongFilter) {}
}
export class ResetMarkers {
  static readonly type = '[Map] Reset Markers';

  constructor(public markers: MarkerOfLocation[]) {}
}

export class SetFilteredMarkers {
  static readonly type = '[Filter Map] Set Filtered Markers';

  constructor(public songs: Song[]) {}
}
