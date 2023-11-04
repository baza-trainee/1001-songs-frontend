import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";

import {ExpeditionsState} from "../../../../store/expeditions/expeditions.state";
import {ArticleExpedition} from "../../../../shared/interfaces/expedition.interface";
import {VideoPlayerComponent} from "../../../../shared/shared-components/video-player/video-player.component";

@Component({
  selector: 'app-expedition-article',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, VideoPlayerComponent],
  templateUrl: './expedition-article.component.html',
  styleUrls: ['./expedition-article.component.scss']
})
export class ExpeditionArticleComponent {
  @Select(ExpeditionsState.getSelectedExpedition) selectedExpedition$?: Observable<ArticleExpedition>;

}
