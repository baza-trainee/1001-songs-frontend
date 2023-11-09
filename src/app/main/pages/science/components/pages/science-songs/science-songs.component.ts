import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbsComponent} from "../../../../../../shared/shared-components/breadcrumbs/breadcrumbs.component";
import {Observable, take} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {mockScienceCycle} from "../../../../../../mock-data/science-cycle";
import {
  MultichanelPlayerComponent
} from "../../../../map/components/player/multichanel-player/multichanel-player.component";
import {StereoPlayerComponent} from "../../../../map/components/player/stereo-player/stereo-player.component";
import {
  PlaylistSongCardComponent
} from "../../../../map/components/player/playlist-song-card/playlist-song-card.component";
import {Select, Store} from "@ngxs/store";
import {PlayerState} from "../../../../../../store/player/player.state";
import {Song} from "../../../../../../shared/interfaces/song.interface";
import {FetchSongsByLocation} from "../../../../../../store/player/player.actions";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-science-songs',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, MultichanelPlayerComponent, StereoPlayerComponent, PlaylistSongCardComponent, TranslateModule],
  templateUrl: './science-songs.component.html',
  styleUrls: ['./science-songs.component.scss']
})
export class ScienceSongsComponent implements OnInit {
  @Select(PlayerState.getSongs) songs$?: Observable<Song[]>;

  title!: string;
  about1: string = "<p>Діти (віком від п’яти до десяти/дванадцяти років) колядували/щедрували поодинці або невеличкими групками. Хлопчики і дівчатка могли ходити разом. Найчастіше бігали до родичів, сусідів, хрещених.</p> <p>У текстах дитячих колядок і щедрівок переважають мотиви випрошування дарів та ритуальні погрози господарям.</p> <p>Колядки/щедрівки дитячого репертуару мають вузький діапазон (секунда, терція, кварта). Пісні засновані на безкінечному повторі однієї (рідше двох) поспівок. Текст при цьому змінюється, рефрени дитячим пісням не властиві.</p>";
  about2: string = "<p>Зазвичай діти інтонують приблизно, спів часто переходить у скандування без чіткої висоти. Натомість ритм (три базові ритмічні формули) діти відтворюють чітко (див. на картах)</p>";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchSongsByLocation("Ромейки"));
    this.route.params.pipe(take(1)).subscribe(params => {
      this.title = mockScienceCycle.subcategories[params['id'].split('')[0]].links[params['id'].split('')[1]];
      if (!this.title) this.router.navigate(['/404']);
    });
  }

}
