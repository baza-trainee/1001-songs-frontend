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
import { FetchSongs, SelectSong } from 'src/app/store/player/player.actions';
import { AudioService } from 'src/app/shared/services/audio/audio.service';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { PlaylistSongDetailsComponent } from './playlist-song-details/playlist-song-details.component';
import { SongFilter } from 'src/app/shared/interfaces/map-marker';
import { FilterMapState } from 'src/app/store/filter-map/filter-map.state';
import { AMOUNT_SONGS_MAP_PAGE } from 'src/app/shared/config/pagination.constatnts';

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
  public currentPage: number = 1;
  totalAmountSong: number = 0;

  songs: PlaylistSong[] = [];
  initialHeight: number = 0;

  @Select(PlayerState.getSongs) songs$!: Observable<PlaylistSong[]>;
  @Select(PlayerState.getSelectedSong) selectedSong$?: Observable<PlaylistSong>;
  @Select(PlayerState.getTotalSongsAmount) totalAmount$?: Observable<number>;
  @Select(FilterMapState.getSelectedValues) selectedValues$?: Observable<SongFilter>;

  currentFilter: SongFilter = {} as SongFilter;

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
    this.totalAmount$?.pipe(takeUntil(this.destroy$)).subscribe((amount) => (this.totalAmountSong = amount));
    this.selectedValues$?.subscribe((filterValues) => {
      this.currentFilter = filterValues;
    });
  }

  ngOnInit(): void {
    this.selectedSong$?.pipe(takeUntil(this.destroy$)).subscribe((playlistSong) => {
      this.playerSong.next(this.playerService.getPlayerSong(playlistSong));
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.songsContainer) this.distanceToTop = this.calculateDistanceToTop();
      this.initialHeight = this.fixedContainer.nativeElement.clientHeight;
    });
  }

  onYtStartsPlay(event: Order){
    this.handleOrders(event)
  }

  onPlayPauseClicked(order: Order) {
    this.handleOrders(order);
  }

  onDeatailsShow(order: Order) {
    this.orderDetails$.next({ id: order.id, type: 'details-toggle' });
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
    return Math.ceil(this.totalAmountSong / AMOUNT_SONGS_MAP_PAGE);
  }

  handleIsPlayChange(order: Order) {
    this.handleOrders(order);
  }

  private handleOrders(order: Order) {
    if (order.type && order.type === 'stp-play') {
      this.orderDetails$.next({ id: 0, type: 'yt-pause' });
      this.store.dispatch(new SelectSong(order.id));
      this.orderToCards$.next({ id: order.id, type: 'stp-play' });
      this.audioService.play();
    }
    if (order.type && order.type === 'stp-pause') {
      this.store.dispatch(new SelectSong(order.id));
      this.orderToCards$.next({ id: order.id, type: 'stp-pause' });
      this.audioService.pause();
    }
    if (order.type && order.type === 'yt-playing') {
      this.orderToCards$.next({ id: -1, type: 'stp-pause-all' });
      this.audioService.pause();
    }
  }

  changePage(page: number): void {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.store.dispatch(new FetchSongs(this.currentFilter, { page, size: AMOUNT_SONGS_MAP_PAGE }));
    }
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
