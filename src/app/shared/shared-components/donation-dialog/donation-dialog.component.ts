import {Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';
import {DonationService} from "../../services/donation/donation.service";
import {Observable} from "rxjs";
import {DonationData} from "../../interfaces/donation";

@Component({
  selector: 'app-donation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './donation-dialog.component.html',
  styleUrls: ['./donation-dialog.component.scss']
})

export class DonationDialogComponent {
  donation$!: Observable<DonationData>;

  actions = { copy: 'Copy IBAN', bmc: 'Buy Me A Coffe', patreon: 'Patreon' };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: unknown,
    public clipboard: Clipboard,
    private donationService: DonationService
  ) {
    this.donation$ = this.donationService.fetchLastDonation();
    // console.log(this.donationService.fetchLastDonation())
    // this.donationService.fetchLastDonation().subscribe(response => {
    //   console.log(response.headers.keys())
    // })
  }
}
