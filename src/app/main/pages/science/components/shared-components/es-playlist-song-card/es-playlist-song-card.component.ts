import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { SciencePlayerComponent } from '../science-player/science-player.component';
import { ScienceSong } from 'src/app/shared/interfaces/science-song.interface';
import { SelectSong } from 'src/app/store/education/es-player.actions';

@Component({
  selector: 'app-es-playlist-song-card',
  standalone: true,
  imports: [
    CommonModule,
    SciencePlayerComponent,
    TranslateModule,
    MatIconModule,
    MatExpansionModule,
    RouterLink
  ],
  templateUrl: './es-playlist-song-card.component.html',
  styleUrls: ['./es-playlist-song-card.component.scss']
})
export class ESPlaylistSongCardComponent implements OnInit {
  @Input() song: ScienceSong = {} as ScienceSong;
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  hasMedia: boolean = true;

  constructor(
    private _translate: TranslateService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.hasMedia = this.song.media ? true : false;
  }

  openCurrentFile() {
    this.store.dispatch(new SelectSong(this.song.id));
  }

  toggleVisibility() {
  }
}