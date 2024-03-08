import { Component, Input } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArrowDownComponent } from '../arrow-down/arrow-down.component';
import {ContentTextComponent} from "../../../../../../shared/shared-components/content-text/content-text.component";
import {SafeHtmlPipe} from "../../../../../../shared/pipes/safe-html.pipe";

@Component({
  selector: 'app-recommended-sources',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, ArrowDownComponent, SlicePipe, ContentTextComponent, SafeHtmlPipe],
  templateUrl: './recommended-sources.component.html',
  styleUrls: ['./recommended-sources.component.scss']
})

export class RecommendedSourcesComponent {
  @Input() recommendedLinks: string = '';

  expansionSourcesArrow = 'bottom';

  rotateSourcesArrow() {
    this.expansionSourcesArrow = this.expansionSourcesArrow === 'bottom' ? 'top' : 'bottom';
  }

  getLinkTitle(link: string) {
    return link.split('/')[2];
  }
}
