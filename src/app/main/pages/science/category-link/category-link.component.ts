import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowOutwardComponent } from 'src/app/icons/arrow-outward/arrow-outward.component';

@Component({
  selector: 'app-category-link',
  standalone: true,
  imports: [CommonModule, ArrowOutwardComponent],
  templateUrl: './category-link.component.html',
  styleUrls: ['./category-link.component.scss']
})
export class CategoryLinkComponent {
  @Input() category: string = 'Hello world';
  @Input() imgUrl: string = 'https://baza-trainee.github.io/1001-songs-frontend/assets/img/home/expedition3.jpg';
}
