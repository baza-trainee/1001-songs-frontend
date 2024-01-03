import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StereoPlayerComponent } from './stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from './multichanel-player/multichanel-player.component';
import { Observable } from 'rxjs';
import { PlaylistSongCardComponent } from './playlist-song-card/playlist-song-card.component';
import { Select, Store } from '@ngxs/store';
import { Song } from 'src/app/shared/interfaces/song.interface';
import { PlayerState } from 'src/app/store/player/player.state';

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
export class PlayerComponent {
  screenWidth: number = 0;
  serverStaticImgPath: string = './assets/img/player/';
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';

  @Select(PlayerState.getSongs) songs$?: Observable<Song[]>;
  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<Song>;

  location = 'Ромейки';

  constructor(
    private _translate: TranslateService,

    private store: Store
  ) {}
}
