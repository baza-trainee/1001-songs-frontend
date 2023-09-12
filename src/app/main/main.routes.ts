import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { MapComponent } from "./pages/map/map.component";
import { NewsComponent } from "./pages/news/news.component";
import { ExpeditionsComponent } from "./pages/expeditions/expeditions.component";
import { ScienceComponent } from "./pages/science/science.component";

export const MAIN_ROUTES: Routes = [
   {path: 'about', component: AboutComponent},
   {path: 'map', component: MapComponent},
   {path: 'news', component: NewsComponent},
   {path: 'expeditions', component: ExpeditionsComponent},
   {path: 'science', component: ScienceComponent},
   {path: '', component: HomeComponent}
]
