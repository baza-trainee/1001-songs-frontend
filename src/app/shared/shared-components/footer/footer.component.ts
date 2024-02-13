import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { navLinksHeader } from '../../enums/navLinks.enum';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DonationDialogComponent } from '../donation-dialog/donation-dialog.component';
import { Observable } from 'rxjs';
import { FooterData } from '../../interfaces/footer';
import { FooterService } from '../../services/footer/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterLink, RouterLinkActive]
})
export class FooterComponent implements OnInit {
  public navLinks = navLinksHeader;
  public footerInfo$!: Observable<FooterData>;

  untamLink = 'https://knmau.com.ua/nauka/laboratoriya-etnomuzikologiyi/';
  lnmaLink = 'https://lnma.edu.ua/kafedry/kafedra-muzychnoji-folklorystyky-ta-pndlme/';
  bazaLink = 'https://baza-trainee.tech/ua';

  constructor(
    private _translate: TranslateService,
    public dialog: MatDialog,
    private footerService: FooterService
  ) {}
  ngOnInit(): void {
    this.footerInfo$ = this.footerService.fetchFooterInfo();
  }

  openDonationDialog() {
    this.dialog.open(DonationDialogComponent, { panelClass: 'custom-modalbox' });
  }
}
