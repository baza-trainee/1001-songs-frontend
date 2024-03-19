import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { navLinksHeader } from '../../enums/navLinks.enum';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DonationDialogComponent } from '../donation-dialog/donation-dialog.component';
import { Observable } from 'rxjs';
import {FooterData, FooterPartners} from '../../interfaces/footer';
import { FooterService } from '../../services/footer/footer.service';
import {TeamPopupComponent} from "./team-popup/team-popup.component";
import {PartnersComponent} from "../partners/partners.component";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterLink, RouterLinkActive, PartnersComponent]
})
export class FooterComponent implements OnInit {
  public navLinks = navLinksHeader;
  public footerInfo$!: Observable<FooterData>;
  public footerPartners$!: Observable<FooterPartners[]>;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplaySpeed: 2000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 10000
  }

  constructor(
    private _translate: TranslateService,
    public dialog: MatDialog,
    private footerService: FooterService
  ) {}
  ngOnInit(): void {
    this.footerInfo$ = this.footerService.fetchFooterInfo();
    this.footerPartners$ = this.footerService.fetchFooterPartners();
  }

  openDonationDialog() {
    this.dialog.open(DonationDialogComponent, { panelClass: 'custom-modalbox' });
  }

  openPopupTeam() {
    this.dialog.open(TeamPopupComponent, { panelClass: 'custom-modalbox' });
  }
}
