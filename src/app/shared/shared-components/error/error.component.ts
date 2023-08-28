import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

import {RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone: true,
  imports: [TranslateModule, RouterLink, RouterLinkActive, CommonModule]
})
export class ErrorComponent {

}
