import { AMOUNT_SONGS_MAP_PAGE } from 'src/app/shared/config/pagination.constatnts';
import { SongFilter } from 'src/app/shared/interfaces/map-marker';

export class FetchSongsByLocation {
  static readonly type = '[Player] Get';

  constructor(public locationName: string) {}
}
export class FetchSongById {
  static readonly type = '[Player] Get by Id';

  constructor(public id: string) {}
}

export class FindSongByTitle {
  static readonly type = '[Player] Find song by title';

  constructor(public songTitle: string) {}
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

  constructor(
    public filter: SongFilter,
    public pagination: { page: number; size: number } = { page: 1, size: AMOUNT_SONGS_MAP_PAGE }
  ) {}
}
