import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {filter, first, Observable} from "rxjs";

import {ExpeditionsState} from "../../../../store/expeditions/expeditions.state";
import Iexpediton, {ArticleExpedition} from "../../../../shared/interfaces/expedition.interface";
import {VideoPlayerComponent} from "../../../../shared/shared-components/video-player/video-player.component";
import {FetchExpeditions, SetSelectedExpedition} from "../../../../store/expeditions/expedition.actions";
import {BreadcrumbsComponent} from "../../../../shared/shared-components/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-expedition-article',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, VideoPlayerComponent, BreadcrumbsComponent],
  templateUrl: './expedition-article.component.html',
  styleUrls: ['./expedition-article.component.scss']
})
export class ExpeditionArticleComponent implements OnInit {
  @Select(ExpeditionsState.getSelectedExpedition) selectedExpedition$?: Observable<ArticleExpedition>;
  @Select(ExpeditionsState.getExpeditionsList) expeditionList$!: Observable<Iexpediton[]>;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchExpeditions());

    this.expeditionList$
      .pipe(
        filter((articles) => articles.length > 0),
        first()
      )
      .subscribe((articles) => {
      const id: string = this.route.snapshot.params['id']
      if (articles.some((article: Iexpediton) => article.id === id)) {
        this.store.dispatch(new SetSelectedExpedition(id));
      } else {
        this.router.navigate(['/404']);
      }
    });
  }
}
// @Select(NewsState.getSelectedArticle) selectedArticle$!: Observable<Article>;
// @Select(NewsState.getArticlesList) articles$!: Observable<Article[]>;
//
// constructor(
//   private store: Store,
//   private route: ActivatedRoute,
//   private router: Router
// ) {}
//
// ngOnInit(): void {
//   this.store.dispatch(new FetchArticles());
//
//   this.articles$
//     .pipe(
//       filter((articles) => articles.length > 0),
//       first()
//     )
//     .subscribe((articles) => {
//       const id: number = this.route.snapshot.params['id']
//       if (articles.some((article: Article) => +article.id === +id)) {
//         this.store.dispatch(new SetSelectedArticle(+id));
//       } else {
//         this.router.navigate(['/404']);
//       }
//     });
// }
