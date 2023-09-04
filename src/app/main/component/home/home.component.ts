import { Component } from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from "@angular/common";
import {Homepage} from "../../../shared/enums/icons.enum";
import {ErrorComponent} from "../../../shared/shared-components/error/error.component";
import {HomeTapeComponent} from "../../../shared/shared-components/home-tape/home-tape.component";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {ShareModalComponent} from "../../../shared/shared-components/share-modal/share-modal.component";



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
  imports: [RouterLink, TranslateModule, CommonModule, ErrorComponent, HomeTapeComponent, MatDialogModule]
})
export class HomeComponent {
  protected readonly homePageAssets = Homepage;

  constructor(
    private _translate: TranslateService,
    public dialog: MatDialog
  ){}

  openDialog(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;

    this.dialog.open(ShareModalComponent, dialogConfig);
  }
}
