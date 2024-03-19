import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { navLinksHeader } from 'src/app/shared/enums/navLinks.enum';
import {ShareService} from "../../../services/share/share.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {GeneralSearchComponent} from "../general-search/general-search.component";
import {Observable} from "rxjs";
import {FooterData} from "../../../interfaces/footer";
import {FooterService} from "../../../services/footer/footer.service";

@Component({
  selector: 'app-pop-up-menu',
  templateUrl: './pop-up-menu.component.html',
  styleUrls: ['./pop-up-menu.component.scss'],
  standalone: true,
    imports: [RouterLink, RouterLinkActive, TranslateModule ,CommonModule, MatSnackBarModule, GeneralSearchComponent]
})
export class PopUpMenuComponent implements OnInit {
  @Output() isPopupOpenChange = new EventEmitter<boolean>();
  @Output() changeLangDetection = new EventEmitter<boolean>();

  public lang!: boolean;
  public navLinks = navLinksHeader;
  public isPopupOpen: boolean = true;
  public footerInfo$!: Observable<FooterData>;

  constructor(
    private _translate: TranslateService,
    private shareService: ShareService,
    private snackBar: MatSnackBar,
    private footerService: FooterService
  ) {}

  ngOnInit(): void {
    this.checkLang();
    this.footerInfo$ = this.footerService.fetchFooterInfo();
  }

  checkLang() {
    this.lang = this._translate.currentLang === 'en';
  }

  selectLang(value: boolean) {
    this._translate.use(value ? 'ua' : 'en');
    this.lang = !value;
    this.checkLang();
    this.changeLangDetection.emit(this.lang);
  }

  togglePopUp() {
    this.isPopupOpen = !this.isPopupOpen;
    this.isPopupOpenChange.emit(this.isPopupOpen);
  }

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
