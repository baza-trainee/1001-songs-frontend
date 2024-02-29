import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistSong } from 'src/app/shared/interfaces/song.interface';
import { FormatTextPipe } from 'src/app/shared/pipes/format-text.pipe';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { VideoPlayerComponent } from 'src/app/shared/shared-components/video-player/video-player.component';

@Component({
  selector: 'app-playlist-song-details',
  standalone: true,
  imports: [CommonModule, FormatTextPipe, RouterLink, TranslateModule, VideoPlayerComponent],
  templateUrl: './playlist-song-details.component.html',
  styleUrls: ['./playlist-song-details.component.scss']
})
export class PlaylistSongDetailsComponent {
  isShowDetail = true;
  isOpened = false;
  song: PlaylistSong = {} as PlaylistSong;
}
