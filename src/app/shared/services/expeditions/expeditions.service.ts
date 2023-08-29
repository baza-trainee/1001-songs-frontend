import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Iexpediton from '../../interfaces/expedition.interface';
import { environment } from 'src/environments/environment';
import { StatEndpoints } from '../../config/endpoints/stat-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionsService {
  categories: string[] = [
    'expeditions.categories.all',
    'expeditions.categories.exploring',
    'expeditions.categories.static',
    'expeditions.categories.interdisciplinary',
    'expeditions.categories.thematic',
    'expeditions.categories.video-of-ritual',
    'expeditions.categories.digital-rcord'
  ];
  $expeditions: BehaviorSubject<Iexpediton[]> = new BehaviorSubject([{} as Iexpediton]);

  constructor(private http: HttpClient) {
    this.uploadExpeditions();
  }

  getExpeditions() {
    return this.$expeditions;
  }

  getCategories() {
    return this.categories;
  }

  private uploadExpeditions() {
    const URL = `${environment.baseUrl}${StatEndpoints.expeditions}`
    this.http.get(URL).subscribe(
      (data) => this.$expeditions.next(data as Iexpediton[]),
      (error) => {
        this.$expeditions.next([{} as Iexpediton]);
        console.error(error.message);
      }
    );
  }
}
