import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { map, tap } from 'rxjs';

import { Article } from '../../shared/interfaces/article.interface';
import { ArticlesService } from '../../shared/services/news/articles.service';
import { SetIsLoading } from '../app/app.actions';
import { FetchArticles, SetSelectedArticle } from './news.actions';

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

  @Action(SetSelectedArticle)
  setSelectedArticle(ctx: StateContext<NewsStateModel>, action: SetSelectedArticle) {
    const state = ctx.getState();
    const selectArticle = state.articlesList.find((article: Article) => article.id === +action.id);

    if (!selectArticle) return;

    return ctx.setState({
      ...state,
      selectedArticle: selectArticle
    });
  }

  @Action(FetchArticles)
  fetchArticles(ctx: StateContext<NewsStateModel>) {
    this.store.dispatch(new SetIsLoading(1));
    return this.articlesService.fetchArticles().pipe(
      map((newsData) => newsData as Article[]),
      tap((articles: Article[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          articlesList: [...articles]
        });
        this.store.dispatch(new SetIsLoading(-1));
      })
    );
  }
}
