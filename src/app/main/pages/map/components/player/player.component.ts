import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {Observable, Subscription} from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { StereoPlayerComponent } from './stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from './multichanel-player/multichanel-player.component';
import { PlaylistSongCardComponent } from './playlist-song-card/playlist-song-card.component';
import { Song } from 'src/app/shared/interfaces/song.interface';
import { PlayerState } from 'src/app/store/player/player.state';
import {PaginationComponent} from "../../../../../shared/shared-components/pagination/pagination.component";

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
export class PlayerComponent implements AfterViewInit, OnDestroy{
  @ViewChild('fixedContainer', { static: true }) fixedContainer!: ElementRef;
  distanceToTop!: number;
  heightHeader!: number;
  screenWidth: number = 0;
  serverStaticImgPath: string = './assets/img/player/';
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  public itemsPerPage: number = 10;
  public currentPage: number = 1;
  songs: Song[] = [];
  private readonly subscription?: Subscription;


  @Select(PlayerState.getSongs) songs$!: Observable<Song[]>;
  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<Song>;
  isFixed: boolean = false;
  location = 'Ромейки';

  constructor(
    private _translate: TranslateService,
    private store: Store
  ) {
    this.subscription = this.songs$.subscribe((data) => {
      if (data) this.songs = data.slice();
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.heightHeader = 108;
    } else if (window.innerWidth <= 768) {
      this.heightHeader = 96;
    } else {
      this.heightHeader = 80;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isFixed = window.scrollY > this.distanceToTop - this.heightHeader
  }
  get totalPages(): number {
    return Math.ceil(this.songs.length / this.itemsPerPage);
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.fixedContainer) {
        this.distanceToTop = this.fixedContainer.nativeElement.getBoundingClientRect().top;
        this.onResize();
      }
    });
  }
}
