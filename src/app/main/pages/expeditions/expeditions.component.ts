import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { ExpeditionListResponse } from 'src/app/shared/interfaces/expedition.interface';
import { ExpeditionCardComponent } from 'src/app/main/pages/expeditions/expedition-card/expedition-card.component';
import { FilterComponent } from '../../../shared/shared-components/filter/filter.component';
import { ExpeditionsService } from 'src/app/shared/services/expeditions/expeditions.service';
import { Category } from "../../../shared/interfaces/article.interface";
import { PaginationComponent } from "../../../shared/shared-components/pagination/pagination.component";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, ExpeditionCardComponent, HttpClientModule, FilterComponent, PaginationComponent, RouterLink]
})

export class ExpeditionsComponent implements OnInit, OnDestroy {
  public expeditionCategories$!: Observable<Category[]>;
  private articlesSubscription?: Subscription;
  private queryParamsSubscription?: Subscription;
  public expeditionResponse$!: Observable<ExpeditionListResponse>;
  public totalPage: number = 1;
  public searchValue: string = "";

  private itemsPerPage: number = 12;
  public currentPage: number = 1;
  public idParamsCategory: number = 0;

  constructor(
    private expeditionsService: ExpeditionsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.fetchExpeditions();
    this.fetchCategory();
  }

  fetchCategory() {
    this.expeditionCategories$ = this.expeditionsService.fetchExpeditionCategories();
  }

  fetchExpeditions() {
    if (!this.route.queryParams) return;

    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.idParamsCategory = params['id'];
      let paramsObg: {search?: string, page: number, size: number} = {page: this.currentPage, size: this.itemsPerPage};
      params['search'] ? this.searchValue = params['search'] : this.searchValue = "";

      if (this.searchValue) paramsObg = {search: this.searchValue, page: this.currentPage, size: this.itemsPerPage};

      this.expeditionResponse$ = this.expeditionsService.fetchExpeditions(paramsObg);

      if (this.idParamsCategory) this.filteredCategory(+params['id']);
      this.fetchTotalPage();
    });
  }

  fetchTotalPage () {
    if (this.expeditionResponse$) {
      this.articlesSubscription = this.expeditionResponse$.subscribe(response => {
        this.totalPage = response.pages;
      })
    }
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.expeditionResponse$ = this.expeditionsService.fetchExpeditions({page: this.currentPage, size: this.itemsPerPage});
  }

  filteredCategory(id: number): void {
    this.idParamsCategory = id;
    this.currentPage = 1;
    this.expeditionResponse$ = this.expeditionsService.fetchExpeditions({search: this.searchValue, page: this.currentPage, size: this.itemsPerPage, id: id});
    this.fetchTotalPage();
  }

  ngOnDestroy(): void {
    if (this.articlesSubscription) this.articlesSubscription.unsubscribe();
    if (this.queryParamsSubscription) this.queryParamsSubscription.unsubscribe();
  }
}
