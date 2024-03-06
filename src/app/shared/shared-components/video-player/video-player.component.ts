import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from './video.service';
import { SanitizePipe } from '../../pipes/sanitizer.pipe';
declare var YT: any;

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, SanitizePipe],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() srcUrl: string = '';
  @Input() widthIcon: number = 48;
  @ViewChild('player') player!: ElementRef;
  isPreviewDisplayed = true;
  previewUrl: string= '';
  embeddedUrl: string='';
  private ytPlayer: any;

  constructor(private videoService: VideoService) {

  }
  ngOnInit(): void {
    // Initialize YouTube player
    this.ytPlayer = new YT.Player('ytPlayer', {
      // height: '360',
      // width: '640',
      videoId: 'cQUnRnuUHcI',
      events: {
          'onStateChange': this.onPlayerStateChange.bind(this)
      }
  });
    this.previewUrl = this.videoService.previewFromUrl(this.srcUrl);
    this.embeddedUrl = this.videoService.getEmbeddedUrl(this.srcUrl);
  }

  onPlayerStateChange(event: any) {
    if (event.data === YT.PlayerState.PAUSED) {
        console.log('Video paused');
        // Do something when the video is paused
    }
}

  playVideo() {
    this.isPreviewDisplayed = false;
    const url = this.player.nativeElement.src;
    this.player.nativeElement.src = url + '&autoplay=1';
  }
}
