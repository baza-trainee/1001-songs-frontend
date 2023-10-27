import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { PopUpMenuComponent } from './pop-up-menu/pop-up-menu.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navLinksHeader } from '../../enums/navLinks.enum';
import { PreloaderComponent } from '../preloader/preloader.component';
import { NgxsModule, Select } from '@ngxs/store';
import { AppState } from 'src/app/store/app/app.state';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    PopUpMenuComponent,
    TranslateModule,
    PreloaderComponent,
    NgxsModule,
    MatDialogModule
  ]
})
export class HeaderComponent {
  @Select(AppState.getIsLoading) isLoading$?: Observable<number>;
  public isPopupOpen = false;
  public changeLang: boolean = true;
  public menuSwitcherOff: boolean = true;
  public navLinks = navLinksHeader;

  public lang = 'Eng';

  constructor(
    private _translate: TranslateService,
    public dialog: MatDialog
  ) {}

  openDialog() {
    this.dialog.open(DialogComponent, { data: { text: 'Error. Try again later' } });
  }

  selectLang() {
    this.changeLang = !this.changeLang;
    this.lang = this.changeLang ? 'Eng' : 'Укр';
    this._translate.use(this.changeLang ? 'ua' : 'en');
  }

  togglePopUp() {
    this.isPopupOpen = !this.isPopupOpen;
  }

  onPopupChange(newStatus: boolean) {
    this.isPopupOpen = newStatus;
  }

  checkLang() {
    this.changeLang = this._translate.currentLang === 'en' ? false : true;
  }

  receivedData(value: boolean) {
    this.changeLang = value ? false : true;
    this.lang = this.changeLang ? 'Eng' : 'Укр';
    this._translate.use(this.changeLang ? 'ua' : 'en');
  }
}
