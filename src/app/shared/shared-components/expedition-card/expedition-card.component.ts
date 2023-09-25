import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Iexpediton from '../../interfaces/expedition.interface';
import { SanitizePipe } from '../../pipes/sanitizer.pipe';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
  selector: 'app-expedition-card',
  standalone: true,
  templateUrl: './expedition-card.component.html',
  styleUrls: ['./expedition-card.component.scss'],
  imports: [CommonModule, SanitizePipe, VideoPlayerComponent]
})
export class ExpeditionCardComponent {
  @Input() event: Iexpediton = {} as Iexpediton;
}
