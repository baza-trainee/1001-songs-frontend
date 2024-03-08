import {SongFilter} from "../../shared/interfaces/map-marker";
export class InitFilterOptions {
  static readonly type = '[Filter Map] Init filter options';

  constructor() {}
}

export class SetShownOptions {
  static readonly type = '[Filter Map] Set shown options';

  constructor(public formValue: SongFilter) {}
}

export class SetSelectedValues {
  static readonly type = '[Filter Map] Set selected filter values';

  constructor(public formValue: SongFilter) {}
}
