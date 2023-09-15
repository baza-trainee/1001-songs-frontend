import {Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

import {RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {errorPage} from "../../enums/navLinks.enum";


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone: true,
  imports: [TranslateModule, RouterLink, RouterLinkActive, CommonModule, HeaderComponent, FooterComponent]
})
export class ErrorComponent {

  protected readonly errorPage = errorPage;

  constructor() {}

}
