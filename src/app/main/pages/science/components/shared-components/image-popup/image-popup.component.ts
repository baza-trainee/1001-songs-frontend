import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-image-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.scss']
})
export class ImagePopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { images: string[], index: number }) {}

  prevImage() {
    if (this.data.index > 0) {
      this.data.index--;
    }
  }

  nextImage() {
    if (this.data.index < this.data.images.length - 1) {
      this.data.index++;
    }
  }
}
