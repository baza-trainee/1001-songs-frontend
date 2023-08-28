import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { MainComponent } from './app/main/main.component';
import { ErrorComponent } from './app/shared/shared-components/error/error.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
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
      // for scroll to top when go to another page
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    )
  ]
}).catch((err) => console.error(err));
