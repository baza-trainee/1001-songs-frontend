import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';

import { StereoPlayerComponent } from './stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from './multichanel-player/multichanel-player.component';
import { PlaylistSongCardComponent } from './playlist-song-card/playlist-song-card.component';
import { Song } from 'src/app/shared/interfaces/song.interface';
import { PlayerState } from 'src/app/store/player/player.state';
import { PaginationComponent } from '../../../../../shared/shared-components/pagination/pagination.component';

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
    PlaylistSongCardComponent,
    PaginationComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('fixedContainer', { static: true }) fixedContainer!: ElementRef;
  @ViewChild('songsContainer', { static: true }) songsContainer!: ElementRef;
  @Input() stereoOnly: boolean = false;
  distanceToTop!: number;
  heightHeader!: number;
  paddingTop!: number;
  isPlay!: boolean;
  heightMap: number = 694;
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  public itemsPerPage: number = 10;
  public currentPage: number = 1;
  songs: Song[] = [];
  private readonly subscription?: Subscription;

  @Select(PlayerState.getSongs) songs$!: Observable<Song[]>;
  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<Song>;
  isFixed: boolean = false;
  location = 'Ромейки';

  constructor(private _translate: TranslateService) {
    this.subscription = this.songs$.subscribe((data) => {
      if (data) this.songs = data.slice();
    });
  }
  ngOnInit(): void {
    this.songs$.subscribe((d) => {
      console.log(d);
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.heightHeader = 108;
      this.paddingTop = 50;
    } else if (window.innerWidth <= 768) {
      this.heightHeader = 96;
      this.paddingTop = 30;
    } else if (window.innerWidth <= 630) {
      this.heightHeader = 80;
      this.paddingTop = 18;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.distanceToTop <= this.heightMap + this.heightHeader || !this.distanceToTop) this.distanceToTop = this.calculateDistanceToTop();
    this.isFixed = window.scrollY > this.distanceToTop - this.heightHeader;
  }

  get totalPages(): number {
    return Math.ceil(this.songs.length / this.itemsPerPage);
  }

  handleIsPlayChange(isPlay: boolean) {
    this.isPlay = isPlay;
  }

  get itemsOnCurrentPage(): Song[] {
    if (this.songs.length <= this.itemsPerPage) return this.songs;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return this.songs.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.songsContainer) this.distanceToTop = this.calculateDistanceToTop();
    });
  }

  calculateDistanceToTop(): number {
    this.onResize();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return this.songsContainer.nativeElement.getBoundingClientRect().top + this.paddingTop + scrollTop;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
