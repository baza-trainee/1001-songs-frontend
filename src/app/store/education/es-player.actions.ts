import { SongFilter } from 'src/app/shared/interfaces/map-marker';

export class FetchSongsByLocation {
  static readonly type = '[Player] Get';

  constructor(public locationName: string) {}
}
export class FetchSongById {
  static readonly type = '[Player] Get education song by Id';

  constructor(public id: string) {}
}
export class SelectSong {
  static readonly type = '[Player] Set educational song';

  constructor(public selectedSongId: string) {}
}
export class ResetSong {
  static readonly type = '[Player] Reset';

  constructor() {}
}
export class SelectNext {
  static readonly type = '[Player] SelectNext';

  constructor() {}
}
export class SelectPrev {
  static readonly type = '[Player] SelectPrev';

  constructor() {}
}

export class FetchSongs {
  static readonly type = '[Player] Fetch songs';

  constructor(public filter: SongFilter) {}
}

export class FetchScienceSongs {
  static readonly type = '[Player] Fetch sciense section songs';

  constructor(public genre: string) {}
}
