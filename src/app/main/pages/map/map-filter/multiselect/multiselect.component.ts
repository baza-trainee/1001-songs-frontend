import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {uk_UA, NzI18nService} from 'ng-zorro-antd/i18n';
import {FilteredOptions} from "../../../../../shared/interfaces/map-marker";


@Component({
  selector: 'app-multiselect',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSelectModule],
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
})

export class MultiselectComponent {
  @Input() listOfOption?: string[] = [];
  @Input() name: string = '';
  @Input() listOfSelectedValue: string[] = [];
  @Output() selectedOptionsChange = new EventEmitter<FilteredOptions>();

  constructor(private i18n: NzI18nService) {
    this.i18n.setLocale(uk_UA);
  }

  notifyParent() {
    this.selectedOptionsChange.emit({name: this.name, selectedOptions: this.listOfSelectedValue});
  }
}
