import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { errorPage } from '../../enums/navLinks.enum';
import { NgxsModule } from '@ngxs/store';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone: true,
    imports: [TranslateModule, RouterLink, RouterLinkActive, CommonModule, HeaderComponent, FooterComponent, NgxsModule, RouterOutlet]
})
export class ErrorComponent {
  protected readonly errorPage = errorPage;

  constructor() {}
}
