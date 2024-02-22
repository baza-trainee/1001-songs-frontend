import { Component, OnInit } from '@angular/core';
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
import { DonationDialogComponent } from 'src/app/shared/shared-components/donation-dialog/donation-dialog.component';
import { FetchSongs } from '../../../store/player/player.actions';
import { SongFilter } from '../../../shared/interfaces/map-marker';
import { Store } from '@ngxs/store';
import { InitFilterOptions } from 'src/app/store/filter-map/filter-map.actions';
import { FetchMarkers } from 'src/app/store/map/map.actions';

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
export class HomeComponent implements OnInit {
  protected readonly homePageAssets = Homepage;

  constructor(
    private _translate: TranslateService,
    public dialog: MatDialog,
    private store: Store
  ) {
    this.store.dispatch(new FetchSongs(new SongFilter()));
  }

  ngOnInit(): void {
    this.store.dispatch(new InitFilterOptions());
    this.store.dispatch(new FetchMarkers(new SongFilter()));
    this.store.dispatch(new FetchSongs(new SongFilter()));
  }

  openDialog(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    this.dialog.open(ShareModalComponent, dialogConfig);
  }

  openDonationDialog() {
    this.dialog.open(DonationDialogComponent, { panelClass: 'custom-modalbox' });
  }

  handleMapEmit(ev: any) {
    console.log(ev);
  }
}
