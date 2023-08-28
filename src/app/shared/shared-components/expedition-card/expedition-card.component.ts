import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  @ViewChild('player') player!: ElementRef;
  isPreviewDisplayed = true;

  playVideo() {
    this.isPreviewDisplayed = false;
    const url = this.player.nativeElement.src;
    this.player.nativeElement.src = url + '&autoplay=1';
  }
}
