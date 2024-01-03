import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { map, tap } from 'rxjs';

import {Article, DataArticle} from '../../shared/interfaces/article.interface';
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
      map((newsData: DataArticle[] | void) => {
        if (!newsData) {
          return [];
        }
        const formattedArticles: Article[] = newsData.map(item => {
          return {
            id: item.id,
            title: item.news_title,
            text: ["У Торуні, одному з найбільш привабливих міст Польщі, цієї неділі відбулися захоплюючі майстер-класи для мішаних та чоловічих гуртів, проведені відомим музикантом та харизматичним виконавцем Євгеном Єфремовим. Майстер-класи пройшли у приміщенні Торунського етнографічного музею і зібрали учасників із різних куточків країни, а також гостей з-за кордону.\\n    Знаменитий баритоніст і диригент, Євген Єфремов, відомий своєю талановитістю та великим досвідом у галузі музики та хорового мистецтва, приїхав до Торуня з метою поділитися своїми знаннями та вміннями з іншими музикантами. Мета майстер-класів полягала не лише у вивченні нових музичних технік та підвищенні виконавської майстерності, але й у сприянні творчому обміну і взаємному натхненню між учасниками.",
              "Торунський етнографічний музей, відомий своєю великою зацікавленістю у збереженні та пропаганді традиційної культури та народних звичаїв, став ідеальним місцем для проведення цих майстер-класів. Учасники отримали можливість не лише попрактикуватися у творчих заняттях з визнаним музикантом, але й зазирнути в історію та традиції різних народів, представлених експозиціями музею.\\n    Перший день майстер-класів був присвячений мішаним гуртам. Учасники, що представляли різні хорові колективи, мали можливість працювати з Євгеном Єфремовим над технікою вокального виконання, виразності та драматургією в музиці. Харизматичний ведучий зміг підтримати та мотивувати кожного учасника, стимулюючи їхню творчість та висловлюючи слова похвали за те, що робить кожен хор особливим."],
            images: [item.photo],
            location: item.location,
            eventDate: item.date,
            authors: [],
            category: item.type_of_news,
            date: item.date
          };
        });
        return formattedArticles;
      }),
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
