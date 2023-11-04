export class FetchExpeditions {
  static readonly type = '[Expeditions] Set';

  constructor() {}
}

export class SetSelectedExpedition {
  static readonly type = '[Expeditions] Set By Id';

  constructor(public id: string) {}
}
