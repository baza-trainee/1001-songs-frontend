import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbsComponent} from "../../../../../../shared/shared-components/breadcrumbs/breadcrumbs.component";
import {TranslateModule} from "@ngx-translate/core";
import {Select, Store} from "@ngxs/store";
import {filter, first, Observable} from "rxjs";
import {Song} from "../../../../../../shared/interfaces/song.interface";
import {StreamState} from "../../../../../../shared/interfaces/stream-state.interface";
import {ActivatedRoute} from "@angular/router";
import {AudioService} from "../../../../../../shared/services/audio/audio.service";
import {ResetSong, SelectSong} from "../../../../../../store/player/player.actions";
import {
  MultichanelPlayerComponent
} from "../../../../map/components/player/multichanel-player/multichanel-player.component";
import {StereoPlayerComponent} from "../../../../map/components/player/stereo-player/stereo-player.component";
import {ShareComponent} from "../../../../../../shared/shared-components/share/share.component";
import {FormatTextPipe} from "../../../../../../shared/pipes/format-text.pipe";
import {ScienceSong} from "../../../../../../shared/interfaces/science-song.interface";
import {ESPlayerState} from "../../../../../../store/education/es-player.state";
import {VideoPlayerComponent} from "../../../../../../shared/shared-components/video-player/video-player.component";

@Component({
  selector: 'app-science-song',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    TranslateModule,
    MultichanelPlayerComponent,
    StereoPlayerComponent,
    ShareComponent,
    FormatTextPipe,
    VideoPlayerComponent
  ],
  templateUrl: './science-song.component.html',
  styleUrls: ['./science-song.component.scss']
})
export class ScienceSongComponent implements OnInit, OnDestroy {
  @Select(ESPlayerState.getSelectedSong) selectedSong$?: Observable<ScienceSong>;

  staticVideoImgUrl: string[] = ['./assets/img/player/video_mock.png'];

  song!: Song;
  photos = [
    { url: './assets/img/Img.png', alt: '' },
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
    this.store.dispatch(new SelectSong(this.route.snapshot.params['idSong']));
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
