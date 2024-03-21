import {ApplicationConfig, importProvidersFrom} from "@angular/core";
import {BrowserModule, provideClientHydration} from "@angular/platform-browser";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {provideRouter, withHashLocation, withInMemoryScrolling} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {ErrorComponent} from "./shared/shared-components/error/error.component";
import {NgxsModule} from "@ngxs/store";
import {AppState} from "./store/app/app.state";
import {MapState} from "./store/map/map.state";
import {PlayerState} from "./store/player/player.state";
import {FilterMapState} from "./store/filter-map/filter-map.state";
import {ESPlayerState} from "./store/education/es-player.state";
import {TranslateModule} from "@ngx-translate/core";

export const config: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      NgxsModule.forRoot([AppState, MapState, PlayerState, FilterMapState, ESPlayerState]),
      BrowserModule,
      TranslateModule.forRoot(),
      MatIconModule,
      MatInputModule,
      MatDialogModule,
      MatSelectModule,
      ReactiveFormsModule
    ),
    provideAnimations(),
    provideRouter(
      [
        {
          path: '',
          component: MainComponent,
          loadChildren: () => import('../app/main/main.routes').then((rm) => rm.MAIN_ROUTES)
        },
        {path: '404', component: ErrorComponent},
        {path: '**', redirectTo: '404'}
      ],

      withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
      withHashLocation()
    ),
    provideHttpClient(withInterceptorsFromDi(), withFetch()), provideClientHydration()
  ]
};
