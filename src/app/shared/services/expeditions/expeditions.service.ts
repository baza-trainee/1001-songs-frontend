import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import IExpediton from '../../interfaces/expedition.interface';

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
  $expeditons: BehaviorSubject<IExpediton[]> = new BehaviorSubject([{} as IExpediton]);

  constructor(private http: HttpClient) {
    this.uploadExpeditions();
  }

  getExpeditions() {
    return this.$expeditons;
  }

  getCategories() {
    return this.categories;
  }

  private uploadExpeditions() {
    this.http.get(this.URL).subscribe(
      (data) => this.$expeditons.next(data as IExpediton[]),
      (error) => {
        this.$expeditons.next([{} as IExpediton]);
        console.error(error.message);
      }
    );
  }
}
