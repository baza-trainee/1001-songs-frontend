import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { navLinksHeader } from 'src/app/shared/enums/navLinks.enum';

@Component({
  selector: 'app-pop-up-menu',
  templateUrl: './pop-up-menu.component.html',
  styleUrls: ['./pop-up-menu.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule, CommonModule]
})
export class PopUpMenuComponent implements OnInit {
  @Output() changeLangDetection = new EventEmitter<boolean>();
  public lang!: boolean;
  public navLinks = navLinksHeader;
  constructor(private _translate: TranslateService) {}

  ngOnInit(): void {
    this.checkLang();
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

  @Input() isPopupOpen!: boolean;
  @Output() isPopupOpenChange = new EventEmitter<boolean>();

  togglePopUp() {
    this.isPopupOpen = !this.isPopupOpen;
    this.isPopupOpenChange.emit(this.isPopupOpen);
  }
}
