import {Routes} from '@angular/router';

import {AboutComponent} from "./pages/about/about.component";
import {MapComponent} from "./pages/map/map.component";
import {NewsComponent} from "./pages/news/news.component";
import {ArticlesComponent} from "./pages/news/components/articles/articles.component";
import {ExpeditionsComponent} from "./pages/expeditions/expeditions.component";
import {ScienceComponent} from "./pages/science/science.component";
import {HomeComponent} from "./pages/home/home.component";

export const MAIN_ROUTES: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'map', component: MapComponent},
  {
    path: '',
    component: NewsComponent,
    children: [{path: 'news', component: ArticlesComponent}]
  },
  {path: 'expeditions', component: ExpeditionsComponent},
  {path: 'science', component: ScienceComponent},
  {path: '', component: HomeComponent}
];
