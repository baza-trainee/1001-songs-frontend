import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { PlayerComponent } from '../player/player.component';
import { StereoPlayerComponent } from '../player/stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from '../player/multichanel-player/multichanel-player.component';
import { PlayerSong, Song } from '../../../../../shared/interfaces/song.interface';
import { PlayerState } from '../../../../../store/player/player.state';
import { ResetSong } from '../../../../../store/player/player.actions';
import { BreadcrumbsComponent } from '../../../../../shared/shared-components/breadcrumbs/breadcrumbs.component';
import { FormatTextPipe } from '../../../../../shared/pipes/format-text.pipe';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { VideoPlayerComponent } from '../../../../../shared/shared-components/video-player/video-player.component';

@Component({
  selector: 'app-song-map',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    PlayerComponent,
    StereoPlayerComponent,
    MultichanelPlayerComponent,
    BreadcrumbsComponent,
    FormatTextPipe,
    VideoPlayerComponent
  ],
  templateUrl: './song-map.component.html',
  styleUrls: ['./song-map.component.scss']
})
export class SongMapComponent implements OnInit, OnDestroy {
  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<Song>;
  @Select(PlayerState.getSongs) songs$!: Observable<Song[]>;

  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  song$: BehaviorSubject<PlayerSong> = new BehaviorSubject<PlayerSong>({} as PlayerSong);
  song: Song = {} as Song;
  haveChannels = false;

  slideIndex = 0;

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    const songId = this.route.snapshot.params['id'];
    this.playerService.fetchSongById(songId).subscribe((response) => {
      console.log(response);
      const data = response as Song;
      this.song = data;
      this.song$.next(this.playerService.getPlayerSong(data));
      if (data.multichannels.length > 0) {
        this.haveChannels = true;
      }
    });
  }

  nextSlide() {
    if (this.slideIndex < this.song.photos.length - 1) this.slideIndex++;
  }

  prevSlide() {
    if (this.slideIndex !== 0) this.slideIndex--;
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetSong());
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
