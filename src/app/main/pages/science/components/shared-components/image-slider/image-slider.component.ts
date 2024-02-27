import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, Input,
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
  @Input({required: true}) images: string[] = [];
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;

  currentImageIndex = 0;
  imageWidth = 520;

  gap: number = 24;
  imageHeight: number = 292;
  sliderWidth!: number;
  translateX!: number;

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

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

  openImagePopup(images: string[], index: number) {
    this.dialog.open(ImagePopupComponent, {
      data: { images: images, index: index }
    });
  }

  nextImage(): void {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  getTranslateX(): number {
    if (!this.images) return 0;
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
    if (!this.images) return false;
    return this.translateX > (this.images.length * (this.imageWidth + this.gap) - this.sliderWidth) - this.gap || this.currentImageIndex === this.images.length - 1;
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }
}
