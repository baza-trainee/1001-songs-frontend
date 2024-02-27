import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {debounceTime, fromEvent, Observable, Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
  ImagePopupComponent
} from "../../../main/pages/science/components/shared-components/image-popup/image-popup.component";

@Component({
  selector: 'app-fade-in-carousel',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './fade-in-carousel.component.html',
  styleUrls: ['./fade-in-carousel.component.scss']
})
export class FadeInCarouselComponent implements OnInit, OnDestroy {
  @Input({required: true}) photos!: string[];
  @Input() title: string = 'Фото';

  @ViewChild('box') boxCarousel!: ElementRef<HTMLDivElement>;

  private resizeObservable$!: Observable<Event>;
  private resizeSubscription$!: Subscription;
  slideIndex: number = 0;
  heightBox: number = 0;

  constructor(
    private _translate: TranslateService,
    public dialog: MatDialog
  ) {}

  nextSlide() {
    if (this.slideIndex < this.photos.length - 1) this.slideIndex++;
  }

  prevSlide() {
    if (this.slideIndex !== 0) this.slideIndex--;
  }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(debounceTime(300));
    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => this.setSliderWidths());
    setTimeout(() => this.setSliderWidths());

  }
  setSliderWidths(): void {
    this.heightBox = this.boxCarousel.nativeElement.offsetWidth * 0.61;
  }

  openImagePopup(image: string[], i: number): void {
    this.dialog.open(ImagePopupComponent, {
      data: { imageSrc: image, index: i }
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }
}
