import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Iexpediton from '../../interfaces/expedition.interface';
//import IExpediton from '../../interfaces/expedition.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionsService {
  private URL: string = 'http://localhost:3000/expeditions';
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
    console.log(process.env)
  }

  getExpeditions() {
    return this.$expeditions;
  }

  getCategories() {
    return this.categories;
  }

  private uploadExpeditions() {
    this.http.get(this.URL).subscribe(
      (data) => this.$expeditions.next(data as Iexpediton[]),
      (error) => {
        this.$expeditions.next([{} as Iexpediton]);
        console.error(error.message);
      }
    );
  }
}
