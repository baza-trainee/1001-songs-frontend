import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { EducationSong } from 'src/app/shared/interfaces/science-song.interface';
import { SelectSong } from 'src/app/store/education/es-player.actions';
import { AudioService } from '../../../../../../shared/services/audio/audio.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-es-playlist-song-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule, MatExpansionModule, RouterLink],
  templateUrl: './es-playlist-song-card.component.html',
  styleUrls: ['./es-playlist-song-card.component.scss']
})
export class ESPlaylistSongCardComponent implements OnInit {
  @Input() song: EducationSong = {} as EducationSong;
  @Input() isSelect!: boolean;
  @Input() isPlay!: boolean;

  @Input() order$: Observable<{ id: number; type: string }> = of({id: 0, type:''});

  @Output() playClicked = new EventEmitter<EducationSong>();

  staticVideoImgUrl: string = './assets/img/player/video_mock.png';
  hasMedia: boolean = true;

  constructor(
    private _translate: TranslateService,
    private store: Store,
    private audioService: AudioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.hasMedia = this.song.stereo_audio ? true : false;
    if(!this.order$) return;
    this.order$.subscribe((d) => {
      console.log('input >>> ' ,d, this.song.id);
    });
  }

  navigateTo(id: string) {
    if (window.innerWidth < 768) {
      this.store.dispatch(new SelectSong(id));
      this.router.navigate([id], { relativeTo: this.route });
    }
    return;
  }

  openCurrentFile() {
    this.playClicked.emit(this.song);
  }
}
