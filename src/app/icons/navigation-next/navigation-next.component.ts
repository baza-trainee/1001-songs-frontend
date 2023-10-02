import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-next',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg class="{{ pointTo }}" width="15" height="15" viewBox="2 0.5 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.56 12L11.5 11.06L8.44667 8L11.5 4.94L10.56 4L6.56 8L10.56 12Z" fill="#131313" />
    </svg>
  `,
  styles: [
    `
      .left {
        transform: rotate(0deg);
      }
      .right {
        transform: rotate(180deg);
      }
    `
  ]
})
export class NavigationNextComponent {
  @Input() pointTo: string = 'left';
}
