import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { CloudService } from '../../../../../shared/services/audio/cloud.service';
import { Song } from '../../../../../shared/interfaces/song.interface';
import { PlayerComponent } from '../player/player.component';
import { StereoPlayerComponent } from '../player/stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from '../player/multichanel-player/multichanel-player.component';
import { Select } from '@ngxs/store';
import { PlayerState } from '../../../../../store/player/player.state';

@Component({
  selector: 'app-song-map',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, PlayerComponent, StereoPlayerComponent, MultichanelPlayerComponent],
  templateUrl: './song-map.component.html',
  styleUrls: ['./song-map.component.scss']
})
export class SongMapComponent implements OnInit, OnDestroy {
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  song!: Song;
  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<Song>;

  constructor(
    private route: ActivatedRoute,
    private cloudServices: CloudService
  ) {}
  photos = [
    { url: './assets/img/home/carousel1.jpg', alt: '' },
    { url: './assets/img/home/carousel2.jpg', alt: '' },
    { url: './assets/img/home/carousel3.jpg', alt: '' }
  ];
  slideIndex = 0;

  nextSlide() {
    if (this.slideIndex < this.photos.length - 1) this.slideIndex++;
  }

  prevSlide() {
    if (this.slideIndex !== 0) this.slideIndex--;
  }

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.ngUnsubscribe),
        switchMap((params) => {
          const id = params['id'];
          return this.cloudServices.getSongById(id);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((song) => {
        this.song = song;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
