import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-image-popup',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.scss']
})
export class ImagePopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { images: string[], index: number }) {}

  prevImage() {
    if (this.data && this.data.index > 0 && this.data.index !== undefined) {
      this.data.index--;
    }
  }

  nextImage() {
    if (this.data && this.data.index < this.data.images.length - 1 && this.data.index !== undefined) {
      this.data.index++;
    }
  }
}
