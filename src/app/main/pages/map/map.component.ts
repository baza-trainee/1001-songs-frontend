import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Marker } from 'src/app/shared/interfaces/map-marker';
import { InteraciveMapComponent } from 'src/app/shared/shared-components/interacive-map/interacive-map.component';
import { MapState } from 'src/app/store/map/map.state';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, InteraciveMapComponent]
})
export class MapComponent {
  @Select(MapState.getMarkersList) markers$?: Observable<any>;
  constructor(private _translate: TranslateService) {
    console.log(this.markers$);
    this.markers$?.subscribe((d) => {
      console.log(d);
    });
  }
}
