import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { PlayerSong, Song } from '../../../../../../shared/interfaces/song.interface';
import { StreamState } from '../../../../../../shared/interfaces/stream-state.interface';
import { AudioService } from '../../../../../../shared/services/audio/audio.service';
import { ResetSong } from '../../../../../../store/player/player.actions';
import { MultichanelPlayerComponent } from '../../../../map/components/player/multichanel-player/multichanel-player.component';
import { StereoPlayerComponent } from '../../../../map/components/player/stereo-player/stereo-player.component';
import { BreadcrumbsComponent } from '../../../../../../shared/shared-components/breadcrumbs/breadcrumbs.component';
import { ShareComponent } from '../../../../../../shared/shared-components/share/share.component';
import { FormatTextPipe } from '../../../../../../shared/pipes/format-text.pipe';
import { ScienceSong } from '../../../../../../shared/interfaces/science-song.interface';
import { ESPlayerState } from '../../../../../../store/education/es-player.state';
import { VideoPlayerComponent } from '../../../../../../shared/shared-components/video-player/video-player.component';
import { FetchSongById } from 'src/app/store/education/es-player.actions';
import { PlayerService } from 'src/app/shared/services/player/player.service';

@Component({
  selector: 'app-science-song',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    TranslateModule,
    MultichanelPlayerComponent,
    StereoPlayerComponent,
    ShareComponent,
    FormatTextPipe,
    VideoPlayerComponent
  ],
  templateUrl: './science-song.component.html',
  styleUrls: ['./science-song.component.scss']
})
export class ScienceSongComponent implements OnInit, OnDestroy {
  @Select(ESPlayerState.getSelectedSong) selectedSong$?: Observable<ScienceSong>;

  staticVideoImgUrl: string[] = ['./assets/img/player/video_mock.png'];

  song!: Song;
  photos: { url: string; alt: string }[] = [{ url: '', alt: '' }];
  slideIndex = 0;
  state$!: Observable<StreamState>;
  playerSong$: BehaviorSubject<PlayerSong> = new BehaviorSubject({} as PlayerSong);
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private audioService: AudioService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.store.dispatch(new FetchSongById(params['idSong']));

    this.selectedSong$?.subscribe((scienceSong) => {
      this.playerSong$.next(this.playerService.getPlayerSong(scienceSong));
      const photos = scienceSong.photos;
      if (!photos || !photos.length) return;
      this.photos = photos.map((el) => ({ url: el + '', alt: 'photo' }));
    });
  }

  nextSlide() {
    if (this.slideIndex < this.photos.length - 1) this.slideIndex++;
  }

  prevSlide() {
    if (this.slideIndex !== 0) this.slideIndex--;
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetSong());
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }
}
