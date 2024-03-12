import { CommonModule } from '@angular/common';
import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import {ExpeditionData, ExpeditionListResponse} from 'src/app/shared/interfaces/expedition.interface';
import { ExpeditionCardComponent } from 'src/app/main/pages/expeditions/expedition-card/expedition-card.component';
import { FilterComponent } from '../../../shared/shared-components/filter/filter.component';
import { ExpeditionsService } from 'src/app/shared/services/expeditions/expeditions.service';
import { Category } from "../../../shared/interfaces/article.interface";
import { PaginationComponent } from "../../../shared/shared-components/pagination/pagination.component";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, ExpeditionCardComponent, HttpClientModule, FilterComponent, PaginationComponent, RouterLink]
})

export class ExpeditionsComponent implements AfterViewInit, OnDestroy {
  public expeditionCategories$?: Observable<ExpeditionData>;
  private articlesSubscription?: Subscription;
  private queryParamsSubscription?: Subscription;
  public expeditionResponse$!: Observable<ExpeditionListResponse>;
  public searchValue: string = "";

  private itemsPerPage: number = 12;
  public currentPage: number = 1;
  public idParamsCategory!: number;

  constructor(
    private expeditionsService: ExpeditionsService,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
    this.fetchExpeditions();
  }

  fetchExpeditions() {
    if (!this.route.queryParams) return;

    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.idParamsCategory = params['id'] ? params['id'] : 0;
      let paramsObg: {search?: string, page: number, size: number} = {page: this.currentPage, size: this.itemsPerPage};
      params['search'] ? this.searchValue = params['search'] : this.searchValue = "";

      if (this.searchValue) {
        paramsObg = {search: this.searchValue, page: this.currentPage, size: this.itemsPerPage}
        this.expeditionResponse$ = this.expeditionsService.fetchExpeditions(paramsObg);
      }

      if (this.idParamsCategory) this.filteredCategory(+params['id']);
      this.expeditionCategories$ = this.expeditionsService.fetchExpeditionCategories();
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.expeditionResponse$ = this.expeditionsService.fetchExpeditions({page: this.currentPage, size: this.itemsPerPage});
  }

  filteredCategory(id: number): void {
    this.idParamsCategory = id;
    this.currentPage = 1;
    this.expeditionResponse$ = this.expeditionsService.fetchExpeditions({search: this.searchValue, page: this.currentPage, size: this.itemsPerPage, id: id});
  }

  ngOnDestroy(): void {
    if (this.articlesSubscription) this.articlesSubscription.unsubscribe();
    if (this.queryParamsSubscription) this.queryParamsSubscription.unsubscribe();
  }
}
