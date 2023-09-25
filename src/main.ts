import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { MainComponent } from './app/main/main.component';
import { ErrorComponent } from './app/shared/shared-components/error/error.component';
import { environment } from './environments/environment';

import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { ExpeditionsState } from './app/store/expeditions/expeditions.state';
import { MapState } from './app/store/map/map.state';
import { AppState } from './app/store/app/app.state';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      NgxsModule.forRoot([AppState, ExpeditionsState, MapState]),
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
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([
      {
        path: '',
        component: MainComponent,
        loadChildren: () => import('./app/main/main.routes').then((rm) => rm.MAIN_ROUTES)
      },
      { path: '404', component: ErrorComponent },
      { path: '**', redirectTo: '404' }
    ]),
    provideRouter(
      [
        {
          path: '',
          component: MainComponent,
          loadChildren: () => import('./app/main/main.routes').then((rm) => rm.MAIN_ROUTES)
        },
        { path: '404', component: ErrorComponent },
        { path: '**', redirectTo: '404' }
      ],
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),

    provideAnimations()
  ]
}).catch((err) => console.error(err));

if (environment.production) {
  enableProdMode();
}
