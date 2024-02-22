import { SongFilter } from 'src/app/shared/interfaces/map-marker';

export class FetchSongsByLocation {
  static readonly type = '[Player] Get';

  constructor(public locationName: string) {}
}
export class FetchSongById {
  static readonly type = '[Player] Get by Id';

  constructor(public id: string) {}
}

export class FindSongById {
  static readonly type = '[Player] Find song by Id';

  constructor(public id: number) {}
}
export class SelectSong {
  static readonly type = '[Player] Set';

  constructor(public selectedSongId: number) {}
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
