import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StereoPlayerComponent } from '../stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from '../multichanel-player/multichanel-player.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { SelectSong } from 'src/app/store/player/player.actions';
import { PlaylistSong } from 'src/app/shared/interfaces/song.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import {AudioService} from "../../../../../../shared/services/audio/audio.service";
import {FormatTextPipe} from "../../../../../../shared/pipes/format-text.pipe";

@Component({
  selector: 'app-playlist-song-card',
  standalone: true,
  imports: [
    CommonModule,
    StereoPlayerComponent,
    MultichanelPlayerComponent,
    TranslateModule,
    MatIconModule,
    MatExpansionModule,
    RouterLink,
    FormatTextPipe
  ],
  templateUrl: './playlist-song-card.component.html',
  styleUrls: ['./playlist-song-card.component.scss']
})
export class PlaylistSongCardComponent implements OnInit, OnDestroy {
  screenWidth: number = 0;
  @Input() song: PlaylistSong = {} as PlaylistSong;
  @Input() isSelectSong! : boolean;
  @Input() isShowDetail: boolean = true;
  @Input() isPlay!: boolean;
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  hasMedia: boolean = true;
  isOpened: boolean = false;
  // isSelectSong: boolean = false;

  constructor(
    private _translate: TranslateService,
    private store: Store,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.hasMedia = this.song.stereo_audio ? true : false;
  }
  ngOnDestroy(): void {
    this.audioService.pause();
  }
  openCurrentFile() {
    if (!this.isSelectSong) {
      this.store.dispatch(new SelectSong(this.song.id));
      this.isPlay = true;
    } else {
      this.isPlay ? this.audioService.pause() : this.audioService.play();
      this.isPlay = !this.isPlay;
    }
  }

  toggleVisibility() {
    this.isOpened = !this.isOpened;
  }

  handleKeyUpEvent(event: Event) {
    if (event && event.isTrusted) {
      this.toggleMobileVisibility();
    }
  }

  toggleMobileVisibility() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 768) {
      this.toggleVisibility()
    }
    return;
  }
}
