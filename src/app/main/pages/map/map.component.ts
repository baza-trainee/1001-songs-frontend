import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { InteraciveMapComponent } from 'src/app/shared/shared-components/interacive-map/interacive-map.component';
import { SetIsLoading } from 'src/app/store/app/app.actions';
import { FetchMarkers } from 'src/app/store/map/map.actions';
import { MapState } from 'src/app/store/map/map.state';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, InteraciveMapComponent]
})
export class MapComponent implements OnInit {
  @Select(MapState.getMarkersList) markers$?: Observable<any>;

  constructor(
    private _translate: TranslateService,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.store.dispatch(new FetchMarkers());
    this.store.dispatch(new SetIsLoading(true));
  }
}
