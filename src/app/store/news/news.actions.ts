export class FetchArticles {
  static readonly type = '[News] Set';

  constructor() {}
}
export class SetSelectedArticle {
  static readonly type = '[News] Set';

  constructor(public id: number) {}
}
