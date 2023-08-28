import { Routes } from "@angular/router";
import { HomeComponent } from "./component/home/home.component";
import { AboutComponent } from "./component/about/about.component";
import { MapComponent } from "./component/map/map.component";
import { NewsComponent } from "./component/news/news.component";
import { ExpeditionsComponent } from "./component/expeditions/expeditions.component";
import { ScienceComponent } from "./component/science/science.component";

export const MAIN_ROUTES: Routes = [
   {path: 'about', component: AboutComponent},
   {path: 'map', component: MapComponent},
   {path: 'news', component: NewsComponent},
   {path: 'expeditions', component: ExpeditionsComponent},
   {path: 'science', component: ScienceComponent},
   {path: '', component: HomeComponent}
]
