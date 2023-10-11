export class SetIsLoading {
  static readonly type = '[App] Set';

  constructor(public loadingStatus: number) {}
}
