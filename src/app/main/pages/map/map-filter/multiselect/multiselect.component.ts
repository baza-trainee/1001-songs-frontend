import {Component, Input} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    TranslateModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule
  ]
})

export class MultiselectComponent {
  @Input({required: true}) control!: FormControl;
  @Input({required: true}) options!: string[];
  @Input({required: true}) name!: string;
  selectedValues: string[] = [];

  constructor(private translate: TranslateService) {}

  onSelectionChange(event: MatSelectChange) {
    this.control.setValue(event.value);
  }

  removeOption(option: string): void {
    const value = this.control.value as string[];
    this.removeFirst(value, option);
    this.control.setValue(value);
  }

  clearSelections(): void {
    this.control.setValue([]);
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
