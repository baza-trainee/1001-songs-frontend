import {Component, Input} from '@angular/core';
import {ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

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
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class MultiselectComponent {
  @Input({required: true}) controlName!: string;
  @Input({required: true}) options!: string[];
  @Input({required: true}) name!: string;
  selectedOptions: string[] = [];

  constructor(private _translate: TranslateService) {}

  onSelectionChange(event: MatSelectChange) {
    this.selectedOptions = event.value;
  }
}
