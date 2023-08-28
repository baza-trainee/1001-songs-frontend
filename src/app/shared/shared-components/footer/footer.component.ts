import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { navLinksHeader } from '../../enums/navLinks.enum';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [TranslateModule, CommonModule, RouterLink, RouterLinkActive]
})
export class FooterComponent {
  public navLinks = navLinksHeader;

  constructor(
    private _translate: TranslateService
  ){}
}
