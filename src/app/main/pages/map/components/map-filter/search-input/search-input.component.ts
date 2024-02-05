import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

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
  @Input({ required: true }) options!: { title: string; id: string }[];
  @Input({ required: true }) name!: string;

  @Output() songSelected = new EventEmitter<{ title: string; id: string }>();

  constructor() {}

  onSongSelected(ev: { title: string; id: string }) {
    this.songSelected.emit(ev);
  }

  getSongTitle(song: { title: string; id: string }) {
    return song.title;
  }
}
