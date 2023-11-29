import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Homepage } from '../../../shared/enums/icons.enum';
import { ErrorComponent } from '../../../shared/shared-components/error/error.component';
import { HomeTapeComponent } from '../../../shared/shared-components/home-tape/home-tape.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ShareModalComponent } from '../../../shared/shared-components/share-modal/share-modal.component';
import { HomeActualComponent } from './components/home-actual/home-actual.component';
import { HomeExpeditionComponent } from './components/home-expedition/home-expedition.component';
import { HomeNewsComponent } from './components/home-news/home-news.component';
import { InteractiveMapComponent } from 'src/app/shared/shared-components/interactive-map/interactive-map.component';
import { DonationDialogComponent } from 'src/app/main/pages/home/components/dialog/donation-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    CommonModule,
    ErrorComponent,
    HomeTapeComponent,
    MatDialogModule,
    InteractiveMapComponent,
    HomeActualComponent,
    HomeExpeditionComponent,
    HomeNewsComponent,
    DonationDialogComponent
  ]
})
export class HomeComponent {
  protected readonly homePageAssets = Homepage;

  constructor(
    private _translate: TranslateService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    this.dialog.open(ShareModalComponent, dialogConfig);
  }

  openDonationDialog() {
    this.dialog.open(DonationDialogComponent, { data: { text: 'Error. Try again later' } });
  }
}
