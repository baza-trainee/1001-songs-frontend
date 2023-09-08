import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ArticlesService } from './articles.service';
import { of } from 'rxjs';

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let articleService: ArticlesService;
let service: ArticlesService;

describe('ArticlesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticlesService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(ArticlesService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    articleService = new ArticlesService(httpClientSpy);
  });

  it('should return values', () => {
    expect(service.getArticles()).toBeTruthy();
  });

  it('should return an article', (done: DoneFn) => {
    let mockArticle = [
      {
        id: 1,
        title: 'Є.Єфремов провів майстеркласи для мішаного та чоловічого гурту у Торунському етнографічному музеї ',
        location: 'Торунь, Польща',
        text: [
          'У Торуні, одному з найбільш привабливих міст Польщі, цієї неділі відбулися захоплюючі майстер-класи для мішаних та чоловічих гуртів, проведені відомим музикантом та харизматичним виконавцем Євгеном Єфремовим. Майстер-класи пройшли у приміщенні Торунського етнографічного музею і зібрали учасників із різних куточків країни, а також гостей з-за кордону.\\n    Знаменитий баритоніст і диригент, Євген Єфремов, відомий своєю талановитістю та великим досвідом у галузі музики та хорового мистецтва, приїхав до Торуня з метою поділитися своїми знаннями та вміннями з іншими музикантами. Мета майстер-класів полягала не лише у вивченні нових музичних технік та підвищенні виконавської майстерності, але й у сприянні творчому обміну і взаємному натхненню між учасниками.',
          'Торунський етнографічний музей, відомий своєю великою зацікавленістю у збереженні та пропаганді традиційної культури та народних звичаїв, став ідеальним місцем для проведення цих майстер-класів. Учасники отримали можливість не лише попрактикуватися у творчих заняттях з визнаним музикантом, але й зазирнути в історію та традиції різних народів, представлених експозиціями музею.\\n    Перший день майстер-класів був присвячений мішаним гуртам. Учасники, що представляли різні хорові колективи, мали можливість працювати з Євгеном Єфремовим над технікою вокального виконання, виразності та драматургією в музиці. Харизматичний ведучий зміг підтримати та мотивувати кожного учасника, стимулюючи їхню творчість та висловлюючи слова похвали за те, що робить кожен хор особливим.'
        ],
        images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1NoeNHly7iXRHRZY67Zm8kN9XKac7FBweROhCON7AwO4KPun7'],
        eventDate: '9-14 квітня 2022',
        authors: [
          {
            seekers: ['Поліщук Петро', 'Поліщук Петро'],
            editor: 'Поліщук Петро',
            video: 'Поліщук Петро',
            records: 'Поліщук Петро'
          }
        ],
        category: 'Майстер-класи',
        date: '09.01.2022'
      }
    ];
    httpClientSpy.get.and.returnValue(of(mockArticle));

    articleService.getArticle(1).subscribe({
      next: (article) => {
        expect(article).withContext('expected article').toEqual(mockArticle);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count()).withContext('ano call').toBe(1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
