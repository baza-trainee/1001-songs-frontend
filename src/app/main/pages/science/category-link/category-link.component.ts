import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-link.component.html',
  styleUrls: ['./category-link.component.scss']
})
export class CategoryLinkComponent {
  @Input() category: string = 'Hello world';
  @Input() imgUrl: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqBRMobAtsKBspRCxYZLTBpoe70VVmmgP8YA&usqp=CAU';
}
