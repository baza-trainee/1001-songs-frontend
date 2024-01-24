import {Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';
import {DonationService} from "../../services/donation/donation.service";
import {Observable} from "rxjs";
import {Donation} from "../../interfaces/donation";

@Component({
  selector: 'app-donation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './donation-dialog.component.html',
  styleUrls: ['./donation-dialog.component.scss']
})

export class DonationDialogComponent {
  donation$: Observable<Donation[]> = this.donationService.fetchLastDonation();

  actions = { copy: 'Copy IBAN', bmc: 'Buy Me A Coffe', patreon: 'Patreon' };
  purposeMessage = "Безповоротна фінансова допомога від прізвище, ім'я, по-батькові.";
  register = '45284215';
  iban = 'UA353052990000026006035028980';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: unknown,
    public clipboard: Clipboard,
    private donationService: DonationService
  ) {}

  copyIBAN() {
    this.clipboard.copy(this.iban);
  }
}
