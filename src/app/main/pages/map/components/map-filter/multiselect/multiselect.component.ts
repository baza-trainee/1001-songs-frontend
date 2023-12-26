import { Component, Input, OnInit } from '@angular/core';
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
export class MultiselectComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) options!: string[];
  @Input({ required: true }) name!: string;
  constructor(private _translate: TranslateService) {}

  ngOnInit(): void {
    this._translate.onLangChange.subscribe((translateState: any) => {
      //console.log(translateState)
     // console.log(this._translate)
    });
  }

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
