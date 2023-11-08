import { Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { MapComponent } from './pages/map/map.component';
import { NewsComponent } from './pages/news/news.component';
import { ExpeditionsComponent } from './pages/expeditions/expeditions.component';
import { ScienceComponent } from './pages/science/science.component';
import { HomeComponent } from './pages/home/home.component';
import { SongMapComponent } from './pages/map/components/song-map/song-map.component';
import { NewsArticleComponent } from './pages/news/components/news-article/news-article.component';
import {ExpeditionArticleComponent} from "./pages/expeditions/expedition-article/expedition-article.component";
import {ScienceCycleComponent} from "./pages/science/components/pages/science-cycle/science-cycle.component";
import {ScienceSongsComponent} from "./pages/science/components/pages/science-songs/science-songs.component";
import {ScienceSongComponent} from "./pages/science/components/pages/science-song/science-song.component";

export const MAIN_ROUTES: Routes = [
  { path: 'about', component: AboutComponent },
  {
    path: 'map',
    children: [
      { path: '', component: MapComponent },
      { path: ':id', component: SongMapComponent }
    ]
  },
  {
    path: 'news',
    children: [
      { path: '', component: NewsComponent },
      { path: ':id', component: NewsArticleComponent }
    ]
  },
  { path: 'expeditions',
    children: [
      { path: '', component: ExpeditionsComponent },
      { path: ':id', component: ExpeditionArticleComponent }
    ]
  },
  { path: 'science', component: ScienceComponent },
  { path: 'expeditions', component: ExpeditionsComponent },
  {
    path: 'science',
    children: [
      { path: '', component: ScienceComponent },
      { path: ':category', component: ScienceCycleComponent },
      { path: ':category/:id', component: ScienceSongsComponent },
      { path: ':category/:id/:idSong', component: ScienceSongComponent }
    ]
  },
  { path: '', component: HomeComponent }
];
