import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StereoPlayerComponent } from './stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from './multichanel-player/multichanel-player.component';
import {Observable, Subscription} from 'rxjs';
import { PlaylistSongCardComponent } from './playlist-song-card/playlist-song-card.component';
import { Select, Store } from '@ngxs/store';
import { Song } from 'src/app/shared/interfaces/song.interface';
import { PlayerState } from 'src/app/store/player/player.state';
import {PaginationComponent} from "../../../../../shared/shared-components/pagination/pagination.component";

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
    PlaylistSongCardComponent,
    PaginationComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  screenWidth: number = 0;
  serverStaticImgPath: string = './assets/img/player/';
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  public itemsPerPage: number = 10;
  public currentPage: number = 1;
  songs: Song[] = [];
  private readonly subscription?: Subscription;


  @Select(PlayerState.getSongs) songs$!: Observable<Song[]>;
  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<Song>;

  location = 'Ромейки';

  constructor(
    private _translate: TranslateService,
    private store: Store
  ) {
    this.subscription = this.songs$.subscribe((data) => {
      if (data) this.songs = data.slice();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.songs.length / this.itemsPerPage);
  }

  get itemsOnCurrentPage(): Song[] {
    if (this.songs.length <= this.itemsPerPage) return this.songs;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return this.songs.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }
}
