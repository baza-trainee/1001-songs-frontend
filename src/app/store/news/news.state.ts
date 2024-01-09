import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {combineLatest, map, tap} from 'rxjs';

import {Article} from '../../shared/interfaces/article.interface';
import { ArticlesService } from '../../shared/services/news/articles.service';
import { SetIsLoading } from '../app/app.actions';
import {FetchNews, SetSelectedArticle} from './news.actions';

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
    private store: Store,
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

    // console.log('setSelectedArticle state:', ctx.getState());
    return ctx.setState({
      ...state,
      selectedArticle: selectArticle
    });
  }

  @Action(FetchNews)
  fetchNews(ctx: StateContext<NewsStateModel>) {
    this.store.dispatch(new SetIsLoading(1));
    return combineLatest([
      this.articlesService.fetchNewsDetail(),
      this.articlesService.fetchNews()
    ]).pipe(
        map(([dataArticle, dataNews]) => {
          return this.articlesService.combineArticle(dataArticle, dataNews);
        }),
        tap((combinedData: Article[]) => {
          const state = ctx.getState();
          ctx.setState({
            ...state,
            articlesList: combinedData.slice()
          });
          this.store.dispatch(new SetIsLoading(-1));
        })
    );
  }
}
