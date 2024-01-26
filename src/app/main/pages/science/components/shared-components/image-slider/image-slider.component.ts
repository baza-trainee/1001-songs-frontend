import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {debounceTime, fromEvent, Observable, Subscription} from "rxjs";

import {ImagePopupComponent} from "../image-popup/image-popup.component";

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;

  currentImageIndex = 0;
  imageWidth = 520;

  gap: number = 24;
  imageHeight: number = 292;
  sliderWidth!: number;
  translateX!: number;

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  images = [
    './assets/img/science/Img_1.jpg',
    './assets/img/science/Img_2.jpg',
    './assets/img/science/Img_1.jpg'
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(debounceTime(300));

    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
      this.setSliderWidths();
    });
  }

  ngAfterViewInit() {
    this.setSliderWidths();
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  setSliderWidths() {
    this.sliderWidth = this.sliderContainer.nativeElement.offsetWidth;
  }

  openImagePopup(image: string): void {
    this.dialog.open(ImagePopupComponent, {
      data: { imageSrc: image }
    });
  }

  nextImage(): void {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  getTranslateX(): number {
    this.translateX = this.currentImageIndex * (this.imageWidth + this.gap);
    if (this.sliderWidth <= 452) {
      this.imageWidth = this.sliderWidth;
      this.imageHeight = 204;
    } else if (this.sliderWidth < 930) {
      this.imageWidth = 452;
      this.imageHeight = 256;
    }
    if (this.translateX > (this.images.length * (this.imageWidth + this.gap) - this.sliderWidth) - this.gap) {
      return -((this.images.length * (this.imageWidth + this.gap) - this.sliderWidth) - this.gap);
    }
    return -this.translateX;
  }

  isNextButtonDisabled(): boolean {
    return this.translateX > (this.images.length * (this.imageWidth + this.gap) - this.sliderWidth) - this.gap || this.currentImageIndex === this.images.length - 1;
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }
}
