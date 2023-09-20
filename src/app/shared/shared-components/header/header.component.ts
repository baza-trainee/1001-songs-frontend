import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { PopUpMenuComponent } from './pop-up-menu/pop-up-menu.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navLinksHeader } from '../../enums/navLinks.enum';
import { PreloaderComponent } from '../preloader/preloader.component';
import { Select } from '@ngxs/store';
import { AppState } from 'src/app/store/app/app.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule, PopUpMenuComponent, TranslateModule,PreloaderComponent]
})
export class HeaderComponent implements OnInit{
  @Select(AppState.getIsLoading) isLoading$?: Observable<boolean>;
  public isPopupOpen = false;
  public changeLang: boolean = true;
  public menuSwitcherOff: boolean = true;
  public navLinks = navLinksHeader;

  public lang = 'Eng';

  constructor(
    private _translate: TranslateService
  ){}

  ngOnInit(): void {
    this.checkLang()
  }

  selectLang(){
    this.changeLang = !this.changeLang;
    this.lang = this.changeLang ? 'Eng' : 'Укр';
    this._translate.use(this.changeLang ? 'ua' : 'en');
  }

  togglePopUp() {
    this.isPopupOpen = !this.isPopupOpen;
  }

  checkLang(){
    this.changeLang = this._translate.currentLang === 'en' ? false : true;
  }

  receivedData(value:boolean){
    this.changeLang = value ? false : true;
    this.lang = this.changeLang ? 'Eng' : 'Укр';
    this._translate.use(this.changeLang ? 'ua' : 'en');
  }

}
