import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arrow-down',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg class="{{ direction }}" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26.6641 16.0002L24.7841 14.1202L17.3307 21.5602V5.3335H14.6641L14.6641 21.5602L7.21073 14.1202L5.33073 16.0002L15.9974 26.6668L26.6641 16.0002Z"
        fill="#131313"
      />
    </svg>
  `,
  styles: [
    `
      .top {
        transform: rotate(180deg);
        transition: 0.3s;
      }
      .bottom {
        transform: rotate(0deg);
        transition: 0.3s;
      }
    `
  ]
})
export class ArrowDownComponent {
  @Input() direction: string = '';
}
