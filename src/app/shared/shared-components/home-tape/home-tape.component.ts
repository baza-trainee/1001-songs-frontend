import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Homepage} from "../../enums/icons.enum";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-home-tape',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home-tape.component.html',
  styleUrls: ['./home-tape.component.scss']
})
export class HomeTapeComponent {
  protected readonly homeTape = Homepage;


}
