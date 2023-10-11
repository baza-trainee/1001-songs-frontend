import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAudioData } from 'src/app/shared/interfaces/audio-data.interface';
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
  @ViewChild('stereoPlayer') stereoPlayer: StereoPlayerComponent | undefined;
  @ViewChild('multiChanelPlayer') multiChanelPlayer: MultichanelPlayerComponent | undefined;
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  // currentFile!: IAudioData;
  //@Output() selectFromList = new even

  constructor(
    private _translate: TranslateService,
    private store: Store
  ) {}
  ngOnInit(): void {
    // console.log(this.file);
  }

  openCurrentFile() {
    //  console.log('initete', this.file);
    this.store.dispatch(new SelectSong(this.song.id));
    // if (this.stereoPlayer) {
    //   this.stereoPlayer.openFile(this.file);
    // }
    // if (this.file.media.multichannel_audio.length > 1 && this.multiChanelPlayer) {
    //   this.multiChanelPlayer.openFile(this.file);
    // }
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
