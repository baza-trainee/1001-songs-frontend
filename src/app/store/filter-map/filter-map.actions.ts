import { Marker, SongFilter } from '../../shared/interfaces/map-marker';

export class UpdateSelectOptions {
  static readonly type = '[Filter Map] Update Select Options';

  constructor(public selectedOptions: SongFilter) {}
}
export class UpdateShowOptions {
  static readonly type = '[Filter Map] Update Show Options';

  constructor(
    public nameOption: keyof SongFilter,
    public markers: Marker[]
  ) {}
}
export class LoadFilteredMarkers {
  static readonly type = '[Filter Map] Load Filtered Markers';

  constructor(public markers: Marker[]) {}
}
