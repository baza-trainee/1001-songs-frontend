import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { FilterMapService } from '../../../../../shared/services/filter-map/filter-map.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    TranslateModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) options!: string[];
  @Input({ required: true }) name!: string;

  constructor(
    private translate: TranslateService,
    private filterMapServices: FilterMapService
  ) {}

  filteredOptions!: Observable<string[]>;
  // private _filter(value: string): Observable<string[]> {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.filterMapServices.searchSongsByTitle(filterValue).pipe(
  //     map((response: any) => {
  //       if (response && Array.isArray(response)) {
  //         return response.map((song: Song) => song.title);
  //       } else {
  //         return [];
  //       }
  //     }),
  //     catchError((error) => {
  //       console.error('Error:', error);
  //       return of([]);
  //     })
  //   );
  // }
}
