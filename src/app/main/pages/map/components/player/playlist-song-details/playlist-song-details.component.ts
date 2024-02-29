import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistSong } from 'src/app/shared/interfaces/song.interface';
import { FormatTextPipe } from 'src/app/shared/pipes/format-text.pipe';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { VideoPlayerComponent } from 'src/app/shared/shared-components/video-player/video-player.component';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-playlist-song-details',
  standalone: true,
  imports: [CommonModule, FormatTextPipe, RouterLink, TranslateModule, VideoPlayerComponent],
  templateUrl: './playlist-song-details.component.html',
  styleUrls: ['./playlist-song-details.component.scss']
})
export class PlaylistSongDetailsComponent implements OnInit, OnDestroy {
  isShowDetail = true;
  isOpened = false;
  @Input() order$: Observable<Order> = of({ id: 0, type: '' });
  @Input() song: PlaylistSong = {} as PlaylistSong;

  destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.order$.pipe(takeUntil(this.destroy$)).subscribe((order: Order) => {
      this.handleInputOrder(order);
    });
  }

  private handleInputOrder(order: Order) {
    if (order.id === this.song.id) {
      this.isOpened = !this.isOpened;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }
}
