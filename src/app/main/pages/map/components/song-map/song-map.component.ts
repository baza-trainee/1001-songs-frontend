import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { filter, first, Observable } from 'rxjs';

import { PlayerComponent } from '../player/player.component';
import { StereoPlayerComponent } from '../player/stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from '../player/multichanel-player/multichanel-player.component';
import { Song } from '../../../../../shared/interfaces/song.interface';
import { PlayerState } from '../../../../../store/player/player.state';
import { ResetSong, SelectSong } from '../../../../../store/player/player.actions';
import { AudioService } from '../../../../../shared/services/audio/audio.service';
import { StreamState } from '../../../../../shared/interfaces/stream-state.interface';
import {BreadcrumbsComponent} from "../../../../../shared/shared-components/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-song-map',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, PlayerComponent, StereoPlayerComponent, MultichanelPlayerComponent, BreadcrumbsComponent],
  templateUrl: './song-map.component.html',
  styleUrls: ['./song-map.component.scss']
})
export class SongMapComponent implements OnInit, OnDestroy {
  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<Song>;
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  song!: Song;
  photos = [
    { url: './assets/img/home/carousel1.jpg', alt: '' },
    { url: './assets/img/home/carousel2.jpg', alt: '' },
    { url: './assets/img/home/carousel3.jpg', alt: '' }
  ];
  slideIndex = 0;
  state$!: Observable<StreamState>;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private audioService: AudioService
  ) {}

  nextSlide() {
    if (this.slideIndex < this.photos.length - 1) this.slideIndex++;
  }

  prevSlide() {
    if (this.slideIndex !== 0) this.slideIndex--;
  }

  ngOnInit() {
    this.store.dispatch(new SelectSong(this.route.snapshot.params['id']));
    
    this.state$ = this.audioService.getState();
    this.state$
      .pipe(
        filter((value) => value.canplay),
        first()
      )
      .subscribe(() => this.audioService.pause());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetSong());
  }
}
