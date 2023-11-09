import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';
import { ShareModal } from '../../enums/icons.enum';
import { ShareModalLink } from '../../enums/navLinks.enum';

@Component({
  selector: 'app-share-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, TranslateModule, ClipboardModule, MatSnackBarModule],
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent implements OnInit {
  protected readonly ShareModal = ShareModal;
  protected readonly ShareModalLink = ShareModalLink;
  fbLink = 'https://www.facebook.com/sharer/sharer.php?';
  navUrl!: string;

  constructor(
    private clipboardService: ClipboardService,
    private snackBar: MatSnackBar,
    public dialogRef: DialogRef
  ) {
    //  this.createNavigationUrl();
  }
  ngOnInit(): void {
    console.log(window.location);
  }

  shareOnFacebook() {
    const searchParams = new URLSearchParams();
    searchParams.set('u', window.location.href);
    const navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
    window.open(navUrl, '_blank');
  }

  shareOnInstagram() {
    const searchParams = new URLSearchParams();
    searchParams.set('u', window.location.href);
    const navUrl = 'https://www.instagram.com/sharer.php' + searchParams;
    window.open(navUrl, '_blank');
  }

  shareOnTelegram() {
    const searchParams = new URLSearchParams();
    searchParams.set('url', window.location.href);
    const navUrl = 'https://t.me/share/url?' + searchParams;
    window.open(navUrl, '_blank');
  }
 
  copyCurrentUrl(): void {
    const currentURL: string = window.location.href;

    this.clipboardService.copyFromContent(currentURL);
    this.openSnackBar();
    // this.closeDialog();
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
