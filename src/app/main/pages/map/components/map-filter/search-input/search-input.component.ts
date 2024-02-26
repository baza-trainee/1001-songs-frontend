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
  @Input({ required: true }) options: string[] = ['hello'];
  @Input({ required: true }) name!: string;

  @Output() songSelected = new EventEmitter<string>();
  @Output() searchBlur = new EventEmitter<string>();
  @Output() searchFocused = new EventEmitter<string>();
  @Output() enterPressed = new EventEmitter<string>();

  constructor() {}

  onKeyPressed(event: KeyboardEvent){
    if(event.key === 'Enter')
    this.enterPressed.emit('event')
  }

  onFocusInput(){
   this.searchFocused.emit(this.control.value)
  }

  onSongSelected(songTitle: string) {
    this.songSelected.emit(songTitle);
  }

  onSearchBlur(event: string) {
    this.searchBlur.emit(event);
  }
}
