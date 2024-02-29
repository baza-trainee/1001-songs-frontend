import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StereoPlayerComponent } from '../stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from '../multichanel-player/multichanel-player.component';
import { TranslateModule } from '@ngx-translate/core';
import { PlaylistCardSong, PlaylistSong } from 'src/app/shared/interfaces/song.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { AudioService } from '../../../../../../shared/services/audio/audio.service';
import { FormatTextPipe } from '../../../../../../shared/pipes/format-text.pipe';
import { VideoPlayerComponent } from '../../../../../../shared/shared-components/video-player/video-player.component';
import { SafeHtmlPipe } from '../../../../../../shared/pipes/safe-html.pipe';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-playlist-song-card',
  standalone: true,
  imports: [
    CommonModule,
    StereoPlayerComponent,
    MultichanelPlayerComponent,
    TranslateModule,
    MatIconModule,
    // MatExpansionModule,
    RouterLink,
    //FormatTextPipe,
    // VideoPlayerComponent,
    SafeHtmlPipe
  ],
  templateUrl: './playlist-song-card.component.html',
  styleUrls: ['./playlist-song-card.component.scss']
})
export class PlaylistSongCardComponent implements OnInit, OnDestroy {
  screenWidth: number = 0;
  @Input() song: PlaylistCardSong = {} as PlaylistCardSong;
  @Input() isSelectSong!: boolean;
  @Input() isShowDetail: boolean = true;
  @Input() isPlay!: boolean;

  @Input() order$: Observable<Order> = of({ id: 0, type: '' });

  @Output() playPauseClicked = new EventEmitter<Order>();
  @Output() showDeatails = new EventEmitter<Order>();

  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  hasMedia: boolean = true;
  isOpened: boolean = false;

  destroy$: Subject<void> = new Subject<void>();

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.hasMedia = this.song.stereo_audio ? true : false;
    this.order$.pipe(takeUntil(this.destroy$)).subscribe((order: Order) => {
      this.handleInputOrder(order);
    });
  }

  private handleInputOrder(order: Order) {
    if (order.id === this.song.id && order.type === 'play') {
      this.isPlay = true;
    } else if (order.id === this.song.id && order.type === 'pause') {
      this.isPlay = false;
    } else {
      this.isPlay = false;
    }
  }

  ngOnDestroy(): void {
    this.audioService.pause();
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }

  playPauseSong() {
    if (this.isPlay) {
      this.playPauseClicked.emit({ id: this.song.id, type: 'pause' });
    } else {
      this.playPauseClicked.emit({ id: this.song.id, type: 'play' });
    }
  }

  toggleVisibility() {
    this.isOpened = !this.isOpened;
    this.showDeatails.emit({ id: this.song.id, type: '' });
  }

  handleKeyUpEvent(event: Event) {
    if (event && event.isTrusted) {
      this.toggleMobileVisibility();
    }
  }

  toggleMobileVisibility() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 768) {
      this.toggleVisibility();
    }
    return;
  }
}
