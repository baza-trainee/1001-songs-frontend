import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { MapComponent } from './component/map/map.component';
import { NewsComponent } from './component/news/news.component';
import { ExpeditionsComponent } from './component/expeditions/expeditions.component';
import { ScienceComponent } from './component/science/science.component';
import { ArticleComponent } from './component/news/components/article/article.component';
import { ArticlesComponent } from './component/news/components/articles/articles.component';

export const MAIN_ROUTES: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'map', component: MapComponent },
  {
    path: '',
    component: NewsComponent,
    children: [
      { path: 'news', component: ArticlesComponent },
      { path: 'article/:id', component: ArticleComponent }
    ]
  },
  { path: 'expeditions', component: ExpeditionsComponent },
  { path: 'science', component: ScienceComponent },
  { path: '', component: HomeComponent }
];
