import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {API_URL, StatEndpoints} from "../../config/endpoints/stat-endpoints";
import {Donation, DonationData, PaymentInfo,} from "../../interfaces/donation";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class DonationService {
  constructor(private http: HttpClient) {}

  private parsePaymentInfo(info: string): PaymentInfo {
    const parts = info.split('.');

    return {
      organization: parts[0],
      edrpou: parts[1],
      iban: parts[2],
      bank: parts[3],
      purpose: parts[4]
    };
  }

  private convertDonationDataToDonation(donationData: DonationData): Donation {
    const paymentInfo = this.parsePaymentInfo(donationData.info);

    return {
      id: donationData.id,
      info: paymentInfo,
      iban: donationData.iban,
      coffee: donationData.coffee,
      patreon: donationData.patreon,
      qr: donationData.qr,
    };
  }

  fetchLastDonation(): Observable<Donation[]> {
    return this.http.get<DonationData[]>(`${API_URL}${StatEndpoints.donation}`).pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      }),
      map((donationDataArray) =>
        donationDataArray.map((donationData) => this.convertDonationDataToDonation(donationData))
      )
    );
  }
}
