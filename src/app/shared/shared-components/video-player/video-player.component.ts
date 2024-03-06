import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from './video.service';
import { SanitizePipe } from '../../pipes/sanitizer.pipe';
import { Order } from '../../interfaces/order.interface';
import { Observable, Subject, of, skip, takeUntil } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const YT: any;

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, SanitizePipe],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @Input() srcUrl: string = '';
  @Input() widthIcon: number = 48;
  @Input() order$: Observable<Order> = of({ id: 0, type: '' });

  @Output() ytStartsPlay = new EventEmitter<Order>();

  isPreviewDisplayed = true;
  previewUrl: string = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ytPlayer: any;

  @ViewChild('playerContainer', { static: true }) playerContainer!: ElementRef;
  playerId: string = 'ytplayer' + Math.random().toString(36).substring(2, 15); // Generate unique player ID;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private videoService: VideoService) {}
  ngOnInit(): void {
    this.order$.pipe(takeUntil(this.destroy$)).pipe(skip(1)).subscribe((order) => {
      if(order.type === 'yt-pause'){
        this.ytPlayer.pauseVideo()
      }
    });
    // Initialize YouTube player
    this.ytPlayer = new YT.Player(this.playerContainer.nativeElement, {
      videoId: this.videoService.getIdFromUrl(this.srcUrl),
      events: {
        onStateChange: this.onPlayerStateChange.bind(this)
      }
    });
    this.previewUrl = this.videoService.previewFromUrl(this.srcUrl);
  }

  onPlayerStateChange(event: { data: string }) {
    if (event.data === YT.PlayerState.PAUSED) {
      //console.log('Video paused');
      // Do something when the video is paused
    }
    if (event.data === YT.PlayerState.PLAYING) {
      this.ytStartsPlay.emit({id: 0, type: 'yt-playing'})
    }
  }

  playVideo() {
    this.isPreviewDisplayed = false;
    this.ytPlayer.playVideo();
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }
}
