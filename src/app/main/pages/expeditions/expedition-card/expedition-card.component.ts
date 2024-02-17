import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Expedition } from '../../../../shared/interfaces/expedition.interface';
import { SanitizePipe } from '../../../../shared/pipes/sanitizer.pipe';
import { VideoPlayerComponent } from '../../../../shared/shared-components/video-player/video-player.component';

@Component({
  selector: 'app-expedition-card',
  standalone: true,
  templateUrl: './expedition-card.component.html',
  styleUrls: ['./expedition-card.component.scss'],
  imports: [CommonModule, SanitizePipe, VideoPlayerComponent, RouterLink]
})
export class ExpeditionCardComponent {
  @Input() event: Expedition = {} as Expedition;
}
