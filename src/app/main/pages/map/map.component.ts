import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import {PlayerComponent} from "./player/player.component";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    standalone: true,
  imports: [TranslateModule, PlayerComponent]
})
export class MapComponent {
  constructor(
    private _translate: TranslateService
  ){}
}
