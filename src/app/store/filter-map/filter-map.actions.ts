import { Song } from 'src/app/shared/interfaces/song.interface';
export class InitFilterOptions {
  static readonly type = '[Filter Map] Init filter options';

  constructor() {}
}

export class SetShownOptions {
  static readonly type = '[Filter Map] Set shown options';

  constructor(public songs: Song[]) {}
}
