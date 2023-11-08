import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbsComponent} from "../../../../../../shared/shared-components/breadcrumbs/breadcrumbs.component";
import {mockScienceCycle} from "../../../../../../mock-data/science-cycle";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-science-song',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, TranslateModule],
  templateUrl: './science-song.component.html',
  styleUrls: ['./science-song.component.scss']
})
export class ScienceSongComponent {

  protected readonly mockScienceCycle = mockScienceCycle;
}
