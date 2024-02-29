import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { StereoPlayerComponent } from './stereo-player/stereo-player.component';
import { MultichanelPlayerComponent } from './multichanel-player/multichanel-player.component';
import { PlaylistSongCardComponent } from './playlist-song-card/playlist-song-card.component';
import { PlayerSong, PlaylistSong } from 'src/app/shared/interfaces/song.interface';
import { PlayerState } from 'src/app/store/player/player.state';
import { PaginationComponent } from '../../../../../shared/shared-components/pagination/pagination.component';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { SelectSong } from 'src/app/store/player/player.actions';
import { AudioService } from 'src/app/shared/services/audio/audio.service';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { PlaylistSongDetailsComponent } from './playlist-song-details/playlist-song-details.component';

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
    PaginationComponent,
    PlaylistSongDetailsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('fixedContainer', { static: true }) fixedContainer!: ElementRef;
  @ViewChild('songsContainer', { static: true }) songsContainer!: ElementRef;
  distanceToTop!: number;
  heightHeader!: number;
  paddingTop!: number;
  heightMap: number = 694;
  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  public itemsPerPage: number = 10;
  public currentPage: number = 1;

  songs: PlaylistSong[] = [];

  @Select(PlayerState.getSongs) songs$!: Observable<PlaylistSong[]>;
  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<PlaylistSong>;
  isFixed: boolean = false;

  playerSong: BehaviorSubject<PlayerSong> = new BehaviorSubject({} as PlayerSong);

  orderToCards$: BehaviorSubject<Order> = new BehaviorSubject({ id: 0, type: '' } as Order);
  orderDetails$: BehaviorSubject<Order> = new BehaviorSubject({ id: 0, type: '' } as Order);

  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private playerService: PlayerService,
    private store: Store,
    private audioService: AudioService
  ) {
    this.songs$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data) this.songs = data.slice();
    });
  }
  ngOnInit(): void {
    this.selectedSong$?.pipe(takeUntil(this.destroy$)).subscribe((playlistSong) => {
      this.playerSong.next(this.playerService.getPlayerSong(playlistSong));
    });
  }

  onPlayPauseClicked(order: Order) {
    this.handleOrders(order);
  }

  onDeatailsShow(order: Order) {
    this.orderDetails$.next({ id: order.id, type: '' });
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

  handleIsPlayChange(order: Order) {
    this.handleOrders(order);
  }

  private handleOrders(order: Order) {
    if (order.type && order.type === 'play') {
      this.store.dispatch(new SelectSong(order.id));
      this.orderToCards$.next({ id: order.id, type: 'play' });
      this.audioService.play();
    }
    if (order.type && order.type === 'pause') {
      this.store.dispatch(new SelectSong(order.id));
      this.orderToCards$.next({ id: order.id, type: 'pause' });
      this.audioService.pause();
    }
  }

  get itemsOnCurrentPage(): PlaylistSong[] {
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
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }
}
