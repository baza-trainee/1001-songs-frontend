import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { InteraciveMapComponent } from 'src/app/shared/shared-components/interacive-map/interacive-map.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [TranslateModule, InteraciveMapComponent]
})
export class MapComponent {
  constructor(private _translate: TranslateService) {}
}
