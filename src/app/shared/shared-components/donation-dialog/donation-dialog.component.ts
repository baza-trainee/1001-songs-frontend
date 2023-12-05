import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-donation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './donation-dialog.component.html',
  styleUrls: ['./donation-dialog.component.scss']
})
export class DonationDialogComponent {
  actions = { copy: 'Copy IBAN', bmc: 'Buy Me A Coffe', patreon: 'Patreon' };
  purposeMessage = "Безповоротна фінансова допомога від прізвище, ім'я, по-батькові.";
  register = '45284215';
  iban = 'UA353052990000026006035028980';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: unknown,
    private clipboard: Clipboard
  ) {}

  copyIBAN() {
    this.clipboard.copy(this.iban);
    const pattern = new RegExp("^[a-z0-9]+((_{2}|-)[a-z0-9]+)*$");
    const str = '::donation';
    console.log(pattern.test(str));
  }
}
