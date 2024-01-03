import { MarkerOfLocation } from '../../shared/interfaces/map-marker';

export class ResetMarkers {
  static readonly type = '[Map] Reset Markers';

  constructor(public markers: MarkerOfLocation[]) {}
}
