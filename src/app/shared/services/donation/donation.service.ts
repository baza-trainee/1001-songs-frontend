import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {API_URL, StatEndpoints} from "../../config/endpoints/stat-endpoints";
import {DonationData} from "../../interfaces/donation";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class DonationService {
  constructor(private http: HttpClient) {}

  fetchLastDonation(): Observable<DonationData> {
    return this.http.get<DonationData>(`${API_URL}${StatEndpoints.payment}`).pipe(
      catchError((error) => {
        console.error(error);
        return of({
          id: 0,
          organization_name: "",
          edrpou: 0,
          bank: "",
          info: "",
          iban: "",
          coffee_url: "",
          patreon_url: "",
          qr_code_url: ""
        });
      }),
    );
  }
}
