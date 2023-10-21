export class FetchSongsByLocation {
  static readonly type = '[Player] Get';

  constructor(public locationName: string) {}
}
export class SelectSong {
  static readonly type = '[Player] Set';

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
