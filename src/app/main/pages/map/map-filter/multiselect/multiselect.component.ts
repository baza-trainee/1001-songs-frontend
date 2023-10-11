import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {uk_UA, NzI18nService} from 'ng-zorro-antd/i18n';


@Component({
  selector: 'app-multiselect',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSelectModule],
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
})

export class MultiselectComponent {
  @Input() listOfOption?: string[] = [];
  @Input() name!: string;
  @Input() listOfSelectedValue!: string[];
  @Output() selectedOptionsChange = new EventEmitter<string[]>();

  constructor(private i18n: NzI18nService) {
    this.i18n.setLocale(uk_UA);
  }

  notifyParent() {
    this.selectedOptionsChange.emit(this.listOfSelectedValue);
  }
}
