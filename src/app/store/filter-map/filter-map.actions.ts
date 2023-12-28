import { Song } from 'src/app/shared/interfaces/song.interface';
import { SongFilter } from '../../shared/interfaces/map-marker';

export class UpdateOptions {
  static readonly type = '[Filter Map] Update Show Options';

  constructor(
    public selectedOptions: SongFilter,
    public optionName: keyof SongFilter
  ) {}
}

export class InitFilterOptions {
  static readonly type = '[Filter Map] Init filter options';

  constructor() {}
}

export class SetShownOptions {
  static readonly type = '[Filter Map] Set shown options';

  constructor(public songs: Song[]) {}
}
