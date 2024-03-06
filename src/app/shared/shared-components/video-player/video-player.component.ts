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

  isPreviewDisplayed = true;
  previewUrl: string = '';

  private ytPlayer: any;
  @ViewChild('playerContainer', { static: true }) playerContainer!: ElementRef;
  playerId: string = 'ytplayer' + Math.random().toString(36).substring(2, 15); // Generate unique player ID;

  constructor(private videoService: VideoService) {}
  ngOnInit(): void {
    // Initialize YouTube player
    this.ytPlayer = new YT.Player(this.playerContainer.nativeElement, {
      videoId: this.videoService.getIdFromUrl(this.srcUrl),
      events: {
        onStateChange: this.onPlayerStateChange.bind(this)
      }
    });
    this.previewUrl = this.videoService.previewFromUrl(this.srcUrl);
    // this.embeddedUrl = this.videoService.getEmbeddedUrl(this.srcUrl);
  }

  onPlayerStateChange(event: any) {
    if (event.data === YT.PlayerState.PAUSED) {
      console.log('Video paused');
      // Do something when the video is paused
    }
  }

  playVideo() {
    this.isPreviewDisplayed = false;
    this.ytPlayer.playVideo();
    // const url = this.player.nativeElement.src;
    // this.player.nativeElement.src = url + '&autoplay=1';
  }
}
