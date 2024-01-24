import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import {API_URL, StatEndpoints} from "../../config/endpoints/stat-endpoints";
import {Donation, DonationData, PaymentInfo} from "../../interfaces/donation";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class DonationService {
  constructor(private http: HttpClient) {}

  fetchLastDonation(): Observable<Donation> {
    return this.http.get<DonationData[]>(`${API_URL}${StatEndpoints.donation}`).pipe(
        map((donations) => {
          const lastDonation = donations.length > 0 ? donations[donations.length - 1] : donations[0];
          console.log(lastDonation)
          return this.mapDonationInfo(lastDonation);
        })
    );
  }

  mapDonationInfo(donationData: DonationData): Donation {
    if (donationData && donationData.info) {
      return {
        id: donationData.id,
        info: this.parsePaymentInfo(donationData.info),
        iban: donationData.iban,
        coffee: donationData.coffee,
        patreon: donationData.patreon,
        qr: donationData.qr
      };
    }

    return {} as Donation;
  }

  parsePaymentInfo(input: string): PaymentInfo {
    const parts = input.split('.');

    const organizationMatch = parts[0].match(/(?<=ГО\s")([^"]*)/);
    const edrpouMatch = parts[1].match(/(?<=ЄДРПОУ:)([^.]*)/);
    const ibanMatch = parts[2].match(/(?<=IBAN:)([^.]*)/);
    const bankMatch = parts[3].match(/(?<=АТ\sКБ\s")[^"]*/);
    const purposeMatch = parts[4].match(/(?<=Призначення\sплатежу:\s")[^"]*/);

    const organization = organizationMatch ? organizationMatch[0] : '';
    const edrpou = edrpouMatch ? edrpouMatch[0] : '';
    const iban = ibanMatch ? ibanMatch[0] : '';
    const bank = bankMatch ? bankMatch[0] : '';
    const purpose = purposeMatch ? purposeMatch[0] : '';

    return {
      organization,
      edrpou,
      iban,
      bank,
      purpose
    };
  }
}
