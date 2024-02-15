import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbsComponent } from '../../../../../../shared/shared-components/breadcrumbs/breadcrumbs.component';
import { scienceCategories } from '../../../../../../static-data/categoriesList';
import { ImageSliderComponent } from '../../shared-components/image-slider/image-slider.component';
import { PaginationComponent } from '../../../../../../shared/shared-components/pagination/pagination.component';
import { genres } from 'src/app/static-data/scientific-genres';
import { SciencePlayerComponent } from '../../shared-components/science-player/science-player.component';
import { FetchScienceSongs } from 'src/app/store/education/es-player.actions';
import { ESPlayerState } from 'src/app/store/education/es-player.state';
import { EducationSong, ScienceSong } from 'src/app/shared/interfaces/science-song.interface';
import { ESPlaylistSongCardComponent } from '../../shared-components/es-playlist-song-card/es-playlist-song-card.component';
import { PlaylistSongCardComponent } from '../../../../map/components/player/playlist-song-card/playlist-song-card.component';
import { StereoPlayerComponent } from '../../../../map/components/player/stereo-player/stereo-player.component';
import { Song } from '../../../../../../shared/interfaces/song.interface';
import { SliderComponent } from '../../../../../../shared/shared-components/slider/slider.component';
import { EducationService } from 'src/app/shared/services/education/education.service';
import { EducationGenre } from 'src/app/shared/interfaces/science.interface';

@Component({
  selector: 'app-science-songs',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    SciencePlayerComponent,
    ESPlaylistSongCardComponent,
    TranslateModule,
    ImageSliderComponent,
    PaginationComponent,
    PlaylistSongCardComponent,
    StereoPlayerComponent,
    SliderComponent
  ],
  templateUrl: './science-songs.component.html',
  styleUrls: ['./science-songs.component.scss']
})
export class ScienceSongsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('fixedContainer', { static: true }) fixedContainer!: ElementRef;
  @ViewChild('playerContainer', { static: true }) playerContainer!: ElementRef;
  @Select(ESPlayerState.getSongs) songs$!: Observable<EducationSong[]>;
  @Select(ESPlayerState.getSelectedSong) selectedSong$?: Observable<Song>;
  public itemsPerPage: number = 10;
  public currentPage: number = 1;
  distanceToTop!: number;
  heightHeader!: number;
  isPlay!: boolean;
  isFixed: boolean = false;
  gap: number = 48;
  genreData = {} as EducationGenre;

  songs: EducationSong[] = [];
  title!: string;
  private readonly subscription?: Subscription;
  about1: string = '';
  about2: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private educationServices: EducationService
  ) {}

  get totalPages(): number {
    return Math.ceil(this.songs.length / this.itemsPerPage);
  }

  get itemsOnCurrentPage(): EducationSong[] {
    if (this.songs.length <= this.itemsPerPage) return this.songs;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return this.songs.slice(startIndex, endIndex);
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.heightHeader = 108;
    } else if (window.innerWidth <= 768) {
      this.heightHeader = 96;
    } else if (window.innerWidth <= 421) {
      this.gap = 32;
      this.heightHeader = 80;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const distanceTop = this.calculateDistanceToTop();
    if (this.distanceToTop <= distanceTop || !this.distanceToTop) this.distanceToTop = this.calculateDistanceToTop();
    this.isFixed = window.scrollY > this.distanceToTop - this.heightHeader;
  }

  handleIsPlayChange(isPlay: boolean) {
    this.isPlay = isPlay;
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  ngOnInit(): void {
    if (!this.route.snapshot) return;
    const genreId = this.route.snapshot.params['id'];
    this.educationServices.fetchGenreById(genreId).subscribe((data) => {
      this.genreData = data as EducationGenre;
    });
   
    this.store.dispatch(new FetchScienceSongs(genreId));
    this.songs$.subscribe((scienseSongs) => {

      this.songs = scienseSongs;
    });
    // this.store.dispatch(new FetchScienceSongs(genreParam as string));
    // this.route.params.pipe(take(1)).subscribe((params) => {
    //   const category = scienceCategories.find((category) => category.routerLink === params['category']);
    //   const subCategory = category?.genreGroups.flatMap((group) => group.genres).find((sub) => sub.query === params['id']);

    //   subCategory?.title ? (this.title = subCategory.title) : this.router.navigate(['/404']);
    // });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.playerContainer) this.distanceToTop = this.calculateDistanceToTop();
    });
  }

  calculateDistanceToTop(): number {
    this.onResize();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return this.playerContainer.nativeElement.getBoundingClientRect().top + scrollTop;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
