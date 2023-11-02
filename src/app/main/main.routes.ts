import { Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { MapComponent } from './pages/map/map.component';
import { NewsComponent } from './pages/news/news.component';
import { ExpeditionsComponent } from './pages/expeditions/expeditions.component';
import { ScienceComponent } from './pages/science/science.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsArticleComponent } from './pages/news/components/news-article/news-article.component';

export const MAIN_ROUTES: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'map', component: MapComponent },
  {
    path: 'news',
    children: [
      { path: '', component: NewsComponent },
      { path: ':id', component: NewsArticleComponent }
    ]
  },
  { path: 'expeditions', component: ExpeditionsComponent },
  { path: 'science', component: ScienceComponent },
  { path: '', component: HomeComponent }
];
