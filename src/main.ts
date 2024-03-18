import {enableProdMode, importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {withInterceptorsFromDi, provideHttpClient, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserModule, bootstrapApplication, provideClientHydration} from '@angular/platform-browser';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {MainComponent} from './app/main/main.component';
import {ErrorComponent} from './app/shared/shared-components/error/error.component';
import {environment} from './environments/environment';

import {provideAnimations} from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';
import {MapState} from './app/store/map/map.state';
import {AppState} from './app/store/app/app.state';
import {PlayerState} from './app/store/player/player.state';
import {FilterMapState} from './app/store/filter-map/filter-map.state';
import {ESPlayerState} from './app/store/education/es-player.state';
import {CacheInterceptor} from "./app/shared/interceptor/cache.interceptor";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      NgxsModule.forRoot([AppState, MapState, PlayerState, FilterMapState, ESPlayerState]),
      BrowserModule,
      TranslateModule.forRoot({
        defaultLanguage: 'ua',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      })
    ),
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      [
        {
          path: '',
          component: MainComponent,
          loadChildren: () => import('./app/main/main.routes').then((rm) => rm.MAIN_ROUTES)
        },
        {path: '404', component: ErrorComponent},
        {path: '**', redirectTo: '404'}
      ],

      withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
      // withHashLocation()
    ),

    provideAnimations(), provideClientHydration()
  ]
}).catch((err) => console.error(err));

if (environment.production) {
  enableProdMode();
}
