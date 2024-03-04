import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ExpeditionsService } from 'src/app/shared/services/expeditions/expeditions.service';
import { Subject, debounceTime, filter, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-search',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, SlicePipe],
  templateUrl: './general-search.component.html',
  styleUrls: ['./general-search.component.scss']
})
export class GeneralSearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchField') searchField!: ElementRef;
  @Input() isPopup: boolean = false;
  @Output() togglePopUp = new EventEmitter<boolean>();
  search = new FormControl('search');
  options: { title: string; id: string; img: string }[] = [];
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
          if (search && search.length > 1) return true;
          else {
            this.options = [];
            return false;
          }
        })
      )
      .subscribe((searchWord) => {
        this.expeditionsService.fetchExpeditions({ search: searchWord + '' }).subscribe((resp) => {
          const data = resp as { items: { title: string; id: number; preview_photo: string }[] };
          this.options = data.items.map((el) => ({ title: el.title, id: el.id + '', img: el.preview_photo + '' }));
        });
      });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInside = this.searchField.nativeElement.contains(event.target);
    if (!clickedInside && this.showInputSearch) {
      this.showInputSearch = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }

  onExpeditionSelected(ev: { id: number }) {
    if (this.isPopup) this.togglePopUp.emit(true);
    this.search.setValue('');
    this.showInputSearch = false;
    this.router.navigateByUrl(`/expeditions/${ev.id}`);
  }

  getExpeditionTitle(expedition: { title: string; id: string }) {
    return expedition.title;
  }

  activateSearch() {
    setTimeout(() => {
      this.showInputSearch = !this.showInputSearch;
    });
  }

  routerExpeditions() {
    if(!this.options.length) return;
    if (this.isPopup) this.togglePopUp.emit(true);
    const searchValue = this.search.value;
    this.search.setValue('');
    this.showInputSearch = false;
    this.router.navigateByUrl(`/expeditions?search=${searchValue}`);
  }
}
