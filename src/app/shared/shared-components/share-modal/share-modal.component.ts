import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule} from 'ngx-clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';
import { ShareModal } from '../../enums/icons.enum';
import { ShareModalLink } from '../../enums/navLinks.enum';
import {ShareService} from "../../services/share/share.service";

@Component({
  selector: 'app-share-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, TranslateModule, ClipboardModule, MatSnackBarModule],
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent {
  protected readonly ShareModal = ShareModal;
  protected readonly ShareModalLink = ShareModalLink;


  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: DialogRef,
    private shareService: ShareService
  ) {}

  shareOnFacebook(): void {
    this.shareService.shareOnFacebook(window.location.href);
  }

  shareOnTelegram(): void {
    this.shareService.shareOnTelegram(window.location.href);
  }

  shareOnInstagram(): void {
    this.shareService.shareOnInstagram(window.location.href);
  }

  copyCurrentUrl(): void {
    this.shareService.copyCurrentUrl(window.location.href);
    this.openSnackBar();
  }

  private openSnackBar(): void {
    this.snackBar.open('URL was copied', '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 1000
    });
  }

  // close dialog window after coping;
  public closeDialog(): void {
    this.dialogRef.close();
  }
}
