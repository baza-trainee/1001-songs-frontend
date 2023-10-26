import { Marker, SelectedMarkerFilter } from '../../shared/interfaces/map-marker';

export class UpdateSelectOptions {
  static readonly type = '[Filter Map] Update Select Options';

  constructor(public selectedOptions: SelectedMarkerFilter) {}
}
export class UpdateShowOptions {
  static readonly type = '[Filter Map] Update Show Options';

  constructor(
    public nameOption: keyof SelectedMarkerFilter,
    public markers: Marker[]
  ) {}
}
export class LoadFilteredMarkers {
  static readonly type = '[Filter Map] Load Filtered Markers';

  constructor(public markers: Marker[]) {}
}
