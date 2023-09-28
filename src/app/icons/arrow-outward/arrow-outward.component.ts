import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arrow-outward',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 18.5V16.5H15.09L5.5 6.91L6.91 5.5L16.5 15.09V6.5H18.5V18.5H6.5Z" fill="#FEFEFE" />
    </svg>
  `,
 // styles: [``]
})
export class ArrowOutwardComponent {}
