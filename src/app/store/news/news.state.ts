import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {map, tap} from "rxjs";

import {Article} from "../../shared/interfaces/article.interface";
import {ArticlesService} from "../../shared/services/news/articles.service";
import {SetIsLoading} from "../app/app.actions";
import {FetchArticles} from "./news.actions";

export interface NewsStateModel {
  articlesList: Article[];
}

@State<NewsStateModel>({
  name: 'news',
  defaults: {
    articlesList: [
      {
        id: 1,
        title: "Є.Єфремов провів майстеркласи для мішаного та чоловічого гурту у Торунському етнографічному музеї ",
        location: "Торунь, Польща",
        text: [
          "У Торуні, одному з найбільш привабливих міст Польщі, цієї неділі відбулися захоплюючі майстер-класи для мішаних та чоловічих гуртів, проведені відомим музикантом та харизматичним виконавцем Євгеном Єфремовим. Майстер-класи пройшли у приміщенні Торунського етнографічного музею і зібрали учасників із різних куточків країни, а також гостей з-за кордону.\\n    Знаменитий баритоніст і диригент, Євген Єфремов, відомий своєю талановитістю та великим досвідом у галузі музики та хорового мистецтва, приїхав до Торуня з метою поділитися своїми знаннями та вміннями з іншими музикантами. Мета майстер-класів полягала не лише у вивченні нових музичних технік та підвищенні виконавської майстерності, але й у сприянні творчому обміну і взаємному натхненню між учасниками.",
          "Торунський етнографічний музей, відомий своєю великою зацікавленістю у збереженні та пропаганді традиційної культури та народних звичаїв, став ідеальним місцем для проведення цих майстер-класів. Учасники отримали можливість не лише попрактикуватися у творчих заняттях з визнаним музикантом, але й зазирнути в історію та традиції різних народів, представлених експозиціями музею.\\n    Перший день майстер-класів був присвячений мішаним гуртам. Учасники, що представляли різні хорові колективи, мали можливість працювати з Євгеном Єфремовим над технікою вокального виконання, виразності та драматургією в музиці. Харизматичний ведучий зміг підтримати та мотивувати кожного учасника, стимулюючи їхню творчість та висловлюючи слова похвали за те, що робить кожен хор особливим."
        ],
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1NoeNHly7iXRHRZY67Zm8kN9XKac7FBweROhCON7AwO4KPun7"
        ],
        eventDate: "9-14 квітня 2022",
        authors: [
          {
            seekers: [
              "Поліщук Петро",
              "Поліщук Петро"
            ],
            editor: "Поліщук Петро",
            video: "Поліщук Петро",
            records: "Поліщук Петро"
          }
        ],
        category: "Майстер-класи",
        date: "09.01.2022"
      }
    ]
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
