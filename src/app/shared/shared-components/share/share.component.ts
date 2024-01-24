import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {ShareService} from "../../services/share/share.service";

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatSnackBarModule],
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent {
  @Input() className: string = '';
  constructor(
    private snackBar: MatSnackBar,
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
}
