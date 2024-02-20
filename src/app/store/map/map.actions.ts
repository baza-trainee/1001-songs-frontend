import {MarkerOfLocation, SongFilter} from '../../shared/interfaces/map-marker';

export class ResetMarkers {
  static readonly type = '[Map] Reset Markers';

  constructor(public markers: MarkerOfLocation[]) {}
}
export class FetchMarkers {
  static readonly type = '[Map] Fetch Markers';

  constructor(public options: SongFilter) {}
}
