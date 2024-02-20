import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ExpeditionsService } from 'src/app/shared/services/expeditions/expeditions.service';
import { Subject, debounceTime, filter, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { StatEndpoints } from 'src/app/shared/config/endpoints/stat-endpoints';

@Component({
  selector: 'app-general-search',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, SlicePipe],
  templateUrl: './general-search.component.html',
  styleUrls: ['./general-search.component.scss']
})
export class GeneralSearchComponent implements OnInit, OnDestroy {
  search = new FormControl('search');
  options: { title: string; id: string }[] = [];

  showInputSearch = false;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private expeditionsService: ExpeditionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(500))
      .pipe(
        filter((search) => {
          if (search && search.length > 2) return true;
          else {
            this.options = [];
            return false;
          }
        })
      )
      .subscribe((searchWord) => {
        this.expeditionsService.fetchExpeditionsListByParams({ search: searchWord + '' }).subscribe((resp) => {
          const data = resp as { items: { title: string; id: number }[] };
          this.options = data.items.map((el) => ({ title: el.title, id: el.id + '' }));
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }

  onExpeditionSelected(ev:{id: number}) {
    this.search.setValue('');
    this.showInputSearch = false;
    this.router.navigateByUrl(`/${StatEndpoints.expeditions}/${ev.id}`);
  }
  getExpeditionTitle(expedition: { title: string; id: string }) {
    return expedition.title;
  }
  activateSearch() {
    this.showInputSearch = !this.showInputSearch;
  }
}
