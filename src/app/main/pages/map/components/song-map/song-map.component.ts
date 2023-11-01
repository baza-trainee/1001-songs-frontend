import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { PlayerComponent } from '../player/player.component';
import { StereoPlayerComponent } from '../player/stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from '../player/multichanel-player/multichanel-player.component';
import { Song } from '../../../../../shared/interfaces/song.interface';
import { PlayerState } from '../../../../../store/player/player.state';

@Component({
  selector: 'app-song-map',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, PlayerComponent, StereoPlayerComponent, MultichanelPlayerComponent],
  templateUrl: './song-map.component.html',
  styleUrls: ['./song-map.component.scss']
})
export class SongMapComponent {
  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<Song>;
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  slideIndex = 0;
  photos = [
    { url: './assets/img/home/carousel1.jpg', alt: '' },
    { url: './assets/img/home/carousel2.jpg', alt: '' },
    { url: './assets/img/home/carousel3.jpg', alt: '' }
  ];

  constructor() {}

  nextSlide() {
    if (this.slideIndex < this.photos.length - 1) this.slideIndex++;
  }

  prevSlide() {
    if (this.slideIndex !== 0) this.slideIndex--;
  }
}
