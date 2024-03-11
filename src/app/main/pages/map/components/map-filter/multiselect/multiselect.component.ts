import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MultiSelect, OptionsSongFilter} from "../../../../../../shared/interfaces/map-marker";
import {Observable} from "rxjs";
import {Select} from "@ngxs/store";
import {FilterMapState} from "../../../../../../store/filter-map/filter-map.state";

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

export class MultiselectComponent implements OnChanges {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) options!: MultiSelect[];
  @Input({ required: true }) name!: string;
  @Output() selectionOnBlur = new EventEmitter<string>();

  @Select(FilterMapState.getShowOptions) showOptions$!: Observable<OptionsSongFilter>;

  selectedOption: MultiSelect[] = [];
  // private subscription!: Subscription;

  constructor(private _translate: TranslateService) {}

  sendBlur(){
    this.selectionOnBlur.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && changes['options'].currentValue) {
      const newOptions: MultiSelect[] = changes['options'].currentValue;
      this.selectedOption = newOptions.filter(option => this.control.value.includes(option.id));
    }
  }

  findOption(optionId: number[]): MultiSelect[] {
    return this.options.filter(option => optionId.includes(option.id));
  }

  onSelectionChange(event: MatSelectChange): void {
    this.control.setValue(event.value);
    this.selectedOption = this.findOption(event.value);
  }

  removeOption(option: number): void {
    const value = this.control.value;
    this.removeFirst(value, option);
    this.selectedOption = this.selectedOption.filter(item => item.id !== option);
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
