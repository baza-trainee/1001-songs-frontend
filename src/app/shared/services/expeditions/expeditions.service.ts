import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionsService {
  private URL: string = 'http://localhost:3000/expeditions';
  categories: string[] = ['Усі', 'Розвідка', 'Стаціонарна', 'Міждисциплінарна', 'Тематична', 'Відеозапис обряду', 'Цифровий запис'];
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
export interface IExpediton {
  name: string;
  shortDescription: string;
  imgUrl: string;
  eventDate: Date;
  location: string;
}
