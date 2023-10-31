import { Marker, SongFilter } from '../../shared/interfaces/map-marker';

export class UpdateOptions {
  static readonly type = '[Filter Map] Update Show Options';

  constructor(
    public selectedOptions: SongFilter,
    public optionName: keyof SongFilter,
    public markers: Marker[]
  ) {}
}
export class LoadFilteredMarkers {
  static readonly type = '[Filter Map] Load Filtered Markers';

  constructor(public markers: Marker[]) {}
}
