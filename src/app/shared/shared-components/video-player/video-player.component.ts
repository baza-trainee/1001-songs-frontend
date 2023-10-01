import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from './video.service';
import { SanitizePipe } from '../../pipes/sanitizer.pipe';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, SanitizePipe],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() srcUrl: string = '';
  @ViewChild('player') player!: ElementRef;
  isPreviewDisplayed = true;
  previewUrl: string= '';
  embeddedUrl: string='';

  constructor(private videoService: VideoService) {
    
  }
  ngOnInit(): void {
    this.previewUrl = this.videoService.previewFromUrl(this.srcUrl);
    this.embeddedUrl = this.videoService.getEmbeddedUrl(this.srcUrl);
  }

  playVideo() {
    this.isPreviewDisplayed = false;
    const url = this.player.nativeElement.src;
    this.player.nativeElement.src = url + '&autoplay=1';
  }
}
