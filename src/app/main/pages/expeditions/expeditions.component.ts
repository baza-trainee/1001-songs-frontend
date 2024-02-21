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

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, ExpeditionCardComponent, HttpClientModule, FilterComponent, PaginationComponent]
})
export class ExpeditionsComponent implements OnInit, OnDestroy {
  public expeditionCategories$!: Observable<Category[]>;
  private articlesSubscription?: Subscription;
  public expeditionResponse$!: Observable<ExpeditionListResponse>;
  public totalPage: number = 1;

  private itemsPerPage: number = 12;
  public currentPage: number = 1;

  constructor(
    private expeditionsService: ExpeditionsService
  ) {}

  ngOnInit(): void {
    this.fetchExpeditions();
    this.fetchCategory();
    this.fetchTotalPage();
  }

  fetchCategory() {
    this.expeditionCategories$ = this.expeditionsService.fetchExpeditionCategories();
  }

  fetchExpeditions() {
    this.expeditionResponse$ = this.expeditionsService.fetchExpeditions({page: this.currentPage, size: this.itemsPerPage});
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
    this.currentPage = 1;
    this.expeditionResponse$ = this.expeditionsService.fetchExpeditions({page: this.currentPage, size: this.itemsPerPage, id: id});
    this.fetchTotalPage();
  }

  ngOnDestroy(): void {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
  }
}
