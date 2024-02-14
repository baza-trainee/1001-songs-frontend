import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArrowDownComponent } from '../arrow-down/arrow-down.component';

@Component({
  selector: 'app-recommended-sources',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, ArrowDownComponent],
  templateUrl: './recommended-sources.component.html',
  styleUrls: ['./recommended-sources.component.scss']
})
export class RecommendedSourcesComponent {
  @Input() data: string = '';
  
  expansionSourcesArrow = 'bottom';
  rotateSourcesArrow() {
    this.expansionSourcesArrow = this.expansionSourcesArrow === 'bottom' ? 'top' : 'bottom';
  }
}
