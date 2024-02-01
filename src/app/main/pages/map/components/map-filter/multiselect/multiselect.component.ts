import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    MatSelectModule,
    TranslateModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ]
})
export class MultiselectComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) options!: string[];
  @Input({ required: true }) name!: string;
  @Output() selectionOnBlur = new EventEmitter<string>()
  constructor(private _translate: TranslateService) {}

  sendBlur(){
    this.selectionOnBlur.emit()
  }

  onSelectionChange(event: MatSelectChange) {
    this.control.setValue(event.value);
  }

  removeOption(option: string): void {
    const value = this.control.value as string[];
    this.removeFirst(value, option);
    this.control.setValue(value);
    this.selectionOnBlur.emit()
  }

  clearSelections(): void {
    this.control.setValue([]);
    this.selectionOnBlur.emit()
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
