import { Injectable } from '@angular/core';
import { Selector, State, Store } from '@ngxs/store';

import {Article} from '../../shared/interfaces/article.interface';
import { ArticlesService } from '../../shared/services/news/articles.service';

export interface NewsStateModel {
  articlesList: Article[];
  selectedArticle: Article;
}

@State<NewsStateModel>({
  name: 'news',
  defaults: {
    articlesList: [],
    selectedArticle: {} as Article
  }
})

@Injectable()
export class NewsState {
  constructor(
    private articlesService: ArticlesService,
    private store: Store
  ) {}

  @Selector()
  static getArticlesList(state: NewsStateModel): Article[] {
    return state.articlesList;
  }
  @Selector()
  static getSelectedArticle(state: NewsStateModel): Article {
    return state.selectedArticle;
  }
}
