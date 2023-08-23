import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IExpediton } from '../../services/expeditions/expeditions.service';
import { SafeMediaUrlPipe } from '../../pipes/safe-media-url.pipe';
import { PreviewFromUrlPipe } from '../../pipes/preview-from-url.pipe';

@Component({
  selector: 'app-expedition-card',
  standalone: true,
  templateUrl: './expedition-card.component.html',
  styleUrls: ['./expedition-card.component.scss'],
  imports: [CommonModule, SafeMediaUrlPipe, PreviewFromUrlPipe]
})
export class ExpeditionCardComponent {
  @Input() event: IExpediton = {} as IExpediton;
  @ViewChild('player') player: any;
  isPreviewDisplayed = true;
  validDate: Date = new Date();

  playVideo() {
    this.isPreviewDisplayed = false;
    console.log(this.player);
    // this.player.click();
    console.log(this.player.attributes);
  }
}
