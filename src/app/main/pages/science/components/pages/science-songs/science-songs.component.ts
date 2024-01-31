import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ScienceSong } from 'src/app/shared/interfaces/science-song.interface';
import { ESPlaylistSongCardComponent } from '../../shared-components/es-playlist-song-card/es-playlist-song-card.component';

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
    PaginationComponent
  ],
  templateUrl: './science-songs.component.html',
  styleUrls: ['./science-songs.component.scss']
})
export class ScienceSongsComponent implements OnInit, OnDestroy {
  @Select(ESPlayerState.getSongs) songs$!: Observable<ScienceSong[]>;
  public itemsPerPage: number = 10;
  public currentPage: number = 1;
  songs: ScienceSong[] = [];
  private readonly subscription?: Subscription;
  title!: string;
  about1: string =
    '<p>Діти (віком від п’яти до десяти/дванадцяти років) колядували/щедрували поодинці або невеличкими групками. Хлопчики і дівчатка могли ходити разом. Найчастіше бігали до родичів, сусідів, хрещених.</p> <p>У текстах дитячих колядок і щедрівок переважають мотиви випрошування дарів та ритуальні погрози господарям.</p> <p>Колядки/щедрівки дитячого репертуару мають вузький діапазон (секунда, терція, кварта). Пісні засновані на безкінечному повторі однієї (рідше двох) поспівок. Текст при цьому змінюється, рефрени дитячим пісням не властиві.</p>';
  about2: string =
    '<p>Зазвичай діти інтонують приблизно, спів часто переходить у скандування без чіткої висоти. Натомість ритм (три базові ритмічні формули) діти відтворюють чітко (див. на картах)</p>';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  get totalPages(): number {
    return Math.ceil(this.songs.length / this.itemsPerPage);
  }

  get itemsOnCurrentPage(): ScienceSong[] {
    if (this.songs.length <= this.itemsPerPage) return this.songs;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return this.songs.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  ngOnInit(): void {
    if (!this.route.snapshot) return;
    const genre = this.route.snapshot.params['id'];
    const genreParam = genres.find((g) => g.translateKey === genre)?.value;
    this.songs$.subscribe((scienseSongs) => {
      this.songs = scienseSongs;
    });
    this.store.dispatch(new FetchScienceSongs(genreParam as string));
    this.route.params.pipe(take(1)).subscribe((params) => {
      const category = scienceCategories.find((category) => category.routerLink === params['category']);
      const subCategory = category?.genreGroups.flatMap((group) => group.genres).find((sub) => sub.query === params['id']);

      subCategory?.title ? (this.title = subCategory.title) : this.router.navigate(['/404']);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
