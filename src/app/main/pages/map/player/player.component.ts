import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AudioService } from '../../../../shared/services/audio/audio.service';
import { StereoPlayerComponent } from './stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from './multichanel-player/multichanel-player.component';
import { Observable } from 'rxjs';
import { PlaylistSongCardComponent } from './playlist-song-card/playlist-song-card.component';
import { Select, Store } from '@ngxs/store';
import { PlaylistState } from 'src/app/store/playlist/playlist.state';
import { FetchSongsByLocation } from 'src/app/store/playlist/playlist.actions';
import { Song } from 'src/app/shared/interfaces/song';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    StereoPlayerComponent,
    MultichanelPlayerComponent,
    PlaylistSongCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  screenWidth: number = 0;
  serverStaticImgPath: string = './assets/img/player/';
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';

  @Select(PlaylistState.getSongs) songs$?: Observable<Song[]>;
  @Select(PlaylistState.getSelectedSong) selectedSong$?: Observable<Song>;

  location = 'Блажове';
  //location = 'Ромейки';

  constructor(
    private _translate: TranslateService,
    private audioService: AudioService,

    private store: Store
  ) {
    this.audioService.showStereoPlayer$.next(true);
  }

  ngOnInit() {
    this.store.dispatch(new FetchSongsByLocation(this.location));
  }

  ngOnDestroy() {
    // this.cloudServiceSubscribe?.unsubscribe();
  }
}
