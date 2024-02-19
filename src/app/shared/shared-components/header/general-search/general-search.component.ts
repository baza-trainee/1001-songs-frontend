import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-general-search',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './general-search.component.html',
  styleUrls: ['./general-search.component.scss']
})
export class GeneralSearchComponent {
  search = new FormControl('search');
  options: { title: string; id: string }[] = [{ title: 'hello', id: '0' }];

  showInputSearch = false;

  onExpeditionSelected(ev: any) {
    console.log(ev);
  }
  getExpeditionTitle(expedition: { title: string; id: string }) {
    return expedition.title;
  }
  activateSearch() {
    this.showInputSearch = !this.showInputSearch;
  }
}
