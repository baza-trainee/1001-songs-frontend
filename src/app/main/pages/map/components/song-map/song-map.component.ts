import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, first, Observable, Subscription } from 'rxjs';

import { PlayerComponent } from '../player/player.component';
import { StereoPlayerComponent } from '../player/stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from '../player/multichanel-player/multichanel-player.component';
import { PlayerSong, Song } from '../../../../../shared/interfaces/song.interface';
import { PlayerState } from '../../../../../store/player/player.state';
import { FetchSongs, ResetSong, SelectSong } from '../../../../../store/player/player.actions';
import { BreadcrumbsComponent } from '../../../../../shared/shared-components/breadcrumbs/breadcrumbs.component';
import { FormatTextPipe } from '../../../../../shared/pipes/format-text.pipe';
import { SongFilter } from '../../../../../shared/interfaces/map-marker';
import { PlayerService } from 'src/app/shared/services/player.service';

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
    FormatTextPipe
  ],
  templateUrl: './song-map.component.html',
  styleUrls: ['./song-map.component.scss']
})
export class SongMapComponent implements OnInit, OnDestroy {
  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<Song>;
  @Select(PlayerState.getSongs) songs$!: Observable<Song[]>;

  playerSong: BehaviorSubject<PlayerSong> = new BehaviorSubject({} as PlayerSong);

  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  song$: BehaviorSubject<PlayerSong> = new BehaviorSubject<PlayerSong>({} as PlayerSong);
  song: Song = {} as Song;
  haveChannels = false;
  photos = [
    { url: './assets/img/home/carousel1.jpg', alt: '' },
    { url: './assets/img/home/carousel2.jpg', alt: '' },
    { url: './assets/img/home/carousel3.jpg', alt: '' }
  ];

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
      const data = response as Song;
      this.song = data;
      this.song$.next(this.playerService.getPlayerSong(data));
      if (data.multichannels.length > 0) {
        this.haveChannels = true;
      }
    });
  }

  nextSlide() {
    if (this.slideIndex < this.photos.length - 1) this.slideIndex++;
  }

  prevSlide() {
    if (this.slideIndex !== 0) this.slideIndex--;
  }

  // async initializeData() {
  //   await this.store.dispatch(new FetchSongs(new SongFilter())).toPromise();

  //   this.subscriptions.push(
  //     this.songs$.pipe(first()).subscribe(() => {
  //       this.store.dispatch(new SelectSong(this.route.snapshot.params['id']));
  //     })
  //   );
  // }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetSong());
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
