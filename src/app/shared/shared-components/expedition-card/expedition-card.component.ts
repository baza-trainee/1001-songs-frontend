import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {Store} from "@ngxs/store";

import Iexpediton from '../../interfaces/expedition.interface';
import { SanitizePipe } from '../../pipes/sanitizer.pipe';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import {SetSelectedExpedition} from "../../../store/expeditions/expedition.actions";

@Component({
  selector: 'app-expedition-card',
  standalone: true,
  templateUrl: './expedition-card.component.html',
  styleUrls: ['./expedition-card.component.scss'],
  imports: [CommonModule, SanitizePipe, VideoPlayerComponent, RouterLink]
})
export class ExpeditionCardComponent {
  @Input() event: Iexpediton = {} as Iexpediton;

  constructor(private store: Store) {}

  setupSelectedExpedition(id: string) {
    this.store.dispatch(new SetSelectedExpedition(id));
  }
}
