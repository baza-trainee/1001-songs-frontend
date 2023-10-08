import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IAudioData } from '../../../../shared/interfaces/audio-data.interface';
import { AudioService } from '../../../../shared/services/audio/audio.service';
import { CloudService } from '../../../../shared/services/audio/cloud.service';
import { StereoPlayerComponent } from './stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from './multichanel-player/multichanel-player.component';
import { Observable, Subscription, skip } from 'rxjs';
import { PlaylistSongCardComponent } from './playlist-song-card/playlist-song-card.component';
import { Select, Store } from '@ngxs/store';
import { PlaylistState } from 'src/app/store/playlist/playlist.state';
import { FetchSongsByLocation } from 'src/app/store/playlist/playlist.actions';
//import { PlayerService } from 'src/app/shared/services/audio/player.service';
import { Song } from 'src/app/shared/interfaces/song';
import { songs } from 'src/app/mock-data/songs';
import { Title } from '@angular/platform-browser';

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
  // files: Song[] = [];
  // currentFile!: IAudioData;
  // cloudServiceSubscribe: Subscription | undefined;
  // @ViewChild('stereoPlayer') stereoPlayer: StereoPlayerComponent | undefined;
  //@ViewChild('multiChanelPlayer') multiChanelPlayer: MultichanelPlayerComponent | undefined;
  @Select(PlaylistState.getSongs) songs$?: Observable<Song[]>;
  @Select(PlaylistState.getSelectedSong) selectedSong$?: Observable<Song>;
  selectedSong = '';
  location = 'Ромейки';
  constructor(
    private _translate: TranslateService,
    private audioService: AudioService,
    // private cloudService: CloudService,
    // private playerService: PlayerService,
    private store: Store
  ) {
    this.audioService.showStereoPlayerSubject.next(true);
    //this.selectedSong = songs[0]
  }

  ngOnInit() {
    this.store.dispatch(new FetchSongsByLocation(this.location));
    this.songs$?.subscribe((s) => console.log(s));
    // this.selectedSong$?.subscribe((song) => {
    //   if (song.title) {
    //     console.log(song);
    //     this.selectedSong = song.title;
    //   }
    // });
    // this.cloudServiceSubscribe = this.cloudService.getFiles().subscribe((data) => {
    //   this.files = data;

    //   this.files.forEach((item: IAudioData, index: number) => {
    //     item.index = index;
    //     item.isDetailOpen = false;
    //     // item.isStereo = item.media!.stereo_audio !== '';
    //     // item.isMultiChanel = item.media.multichannel_audio.length > 0;
    //   });
    // });
  }

  ngOnDestroy() {
    // this.cloudServiceSubscribe?.unsubscribe();
  }

  // toggleDetailBtn(file: IAudioData) {
  //   file.isDetailOpen = !file.isDetailOpen;
  // }

  // openCurrentFile(song: IAudioData) {
  //   // if (song.media.stereo_audio && this.stereoPlayer) {
  //   //   this.stereoPlayer.openFile(song);
  //   // }
  //   // if (file.isMultiChanel && this.multiChanelPlayer) {
  //   //   this.multiChanelPlayer.openFile(file);
  //   // }
  // }

  // nextSong() {
  //   if (this.currentFile && this.currentFile.index) {
  //     const index = this.currentFile.index + 1;
  //     const file = this.files[index];
  //     this.openCurrentFile(file);
  //   }
  // }

  // previousSong() {
  //   if (this.currentFile && this.currentFile.index) {
  //     const index = this.currentFile.index - 1;
  //     const file = this.files[index];
  //     this.openCurrentFile(file);
  //   }
  // }

  // mobileToggleDetailBtn(file: IAudioData) {
  //   this.screenWidth = window.innerWidth;
  //   if(this.screenWidth < 768){
  //     file.isDetailOpen = !file.isDetailOpen;
  //   }
  //   return
  // }

  // handleKeyUpEvent(event: Event, file: IAudioData){
  //   if(event && event.isTrusted){
  //     this.mobileToggleDetailBtn(file);
  //   }
  // }
}
