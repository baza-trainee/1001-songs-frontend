import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import {NewsState} from "./news.state";
import {FetchArticles} from "./news.actions";
import {testNewsData} from "../../mock-data/tests";

describe('NewsState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([NewsState]), HttpClientModule]
    });
    store = TestBed.inject(Store);
  });

  it('it should fetch expeditions', async () => {
    await store.dispatch(new FetchArticles()).toPromise();
    const article = store.selectSnapshot(NewsState.getArticlesList);
    expect(article.length).toBe(6);
  });

  it('it should select expeditions', () => {
    const article = store.selectSnapshot(NewsState.getArticlesList);
    expect(article).toEqual(testNewsData);
  });
});
