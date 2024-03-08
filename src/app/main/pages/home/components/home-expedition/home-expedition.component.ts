import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Router, RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {ExpeditionListResponse} from "../../../../../shared/interfaces/expedition.interface";
import {ExpeditionsService} from "../../../../../shared/services/expeditions/expeditions.service";

@Component({
  selector: 'app-home-expedition',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, NgOptimizedImage],
  templateUrl: './home-expedition.component.html',
  styleUrls: ['./home-expedition.component.scss']
})
export class HomeExpeditionComponent implements OnInit {
  public expeditionResponse$!: Observable<ExpeditionListResponse>;

  constructor(
      private _translate: TranslateService,
      private expeditionsService: ExpeditionsService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.expeditionResponse$ = this.expeditionsService.fetchExpeditions({page: 1, size: 4});
  }

  redirectToNews(id: number | undefined) {
    if (id) {
      this.router.navigate(['/expeditions/' + id])
    } else {
      this.router.navigate(['/404'])
    }
  }
}
