import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {API_URL, StatEndpoints} from "../../config/endpoints/stat-endpoints";
import {Footer} from "../../interfaces/footer";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private http: HttpClient) { }

  fetchFooterInfo(): Observable<Footer> {
    return this.http.get<Footer>(`${API_URL}${StatEndpoints.footer}`).pipe(
      catchError((error) => {
        console.error(error);
        return of({
          reporting: '',
          privacy_policy: '',
          rules_and_terms: '',
          email: '',
          facebook_url: '',
          youtube_url: ''
        });
      })
    );
  }
}
