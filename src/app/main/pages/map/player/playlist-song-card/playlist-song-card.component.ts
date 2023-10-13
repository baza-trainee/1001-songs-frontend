import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StereoPlayerComponent } from '../stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from '../multichanel-player/multichanel-player.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { SelectSong } from 'src/app/store/player/player.actions';
import { Song } from 'src/app/shared/interfaces/song';

@Component({
  selector: 'app-playlist-song-card',
  standalone: true,
  imports: [CommonModule, StereoPlayerComponent, MultichanelPlayerComponent, TranslateModule],
  templateUrl: './playlist-song-card.component.html',
  styleUrls: ['./playlist-song-card.component.scss']
})
export class PlaylistSongCardComponent implements OnInit {
  screenWidth: number = 0;
  @Input() song: Song = {} as Song;
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  hasMedia: boolean = true;

  constructor(
    private _translate: TranslateService,
    private store: Store
  ) {}
  ngOnInit(): void {
    console.log(this.song);
    this.hasMedia = this.song.media ? true : false;
  }

  openCurrentFile() {
    this.store.dispatch(new SelectSong(this.song.id));
  }

  toggleDetailBtn() {
    this.song.isDetailOpen = !this.song.isDetailOpen;
  }

  handleKeyUpEvent(event: Event, file: Song) {
    if (event && event.isTrusted) {
      this.mobileToggleDetailBtn();
    }
  }

  mobileToggleDetailBtn() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 768) {
      this.song.isDetailOpen = !this.song.isDetailOpen;
    }
    return;
  }
}
