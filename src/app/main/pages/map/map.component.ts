import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import {PlayerComponent} from "./player/player.component";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule, PlayerComponent]
})
export class MapComponent {
  constructor(
    private _translate: TranslateService
  ){}
}
