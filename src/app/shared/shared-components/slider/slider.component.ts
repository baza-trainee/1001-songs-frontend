import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  Input,
  OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, fromEvent, Observable, Subscription } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';
import { Slide } from '../../interfaces/slide.interface';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-slider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})

export class SliderComponent implements OnInit, OnDestroy {
  @Input() sliderItems!: Slide[];
  @Input() title!: string;
  @Input() link!: string;

  @ViewChild('track') track!: ElementRef<HTMLDivElement>;
  @ViewChild('sliderContainer') sliderContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('slide') slide!: ElementRef<HTMLDivElement>;

  private resizeObservable$!: Observable<Event>;
  private resizeSubscription$!: Subscription;

  // Properties for the slider
  private sliderContainerWidth!: number;
  private gap: number = 24;
  public defaultSlideWidth: number = 302;

  // Properties for managing slider position and navigation
  private minTranslateX!: number;
  private maxTranslateX: number = 0;
  public translateX: number = 0;
  public prevIsDisabled = true;
  public nextIsDisabled = false;
  public isShowButton!: boolean;


  // Properties for dragging the slider
  private dragStartX: number = 0;
  private prevDragX: number = 0;
  private isDragging: boolean = false;
  private isTouchStart: boolean = false;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(debounceTime(300));
    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => this.setSliderWidths());
    setTimeout(() => this.setSliderWidths());
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    this.isDragging = true;
    this.isTouchStart = true;
    this.dragStartX = touch.clientX;
    this.prevDragX = touch.clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (this.isDragging && this.isTouchStart) {
      const touch = event.touches[0];
      const diffX = touch.clientX - this.prevDragX;

      if (this.isTouchStart) {
        const slideDistance = diffX > 0 ? this.defaultSlideWidth + this.gap : -(this.defaultSlideWidth + this.gap);
        this.translateX += slideDistance;
        this.isTouchStart = false;
      }
      this.prevDragX = touch.clientX;

      if (this.translateX < this.minTranslateX) this.translateX = this.minTranslateX;
      if (this.translateX > this.maxTranslateX) this.translateX = this.maxTranslateX;
    }
  }

  @HostListener('touchend')
  onTouchEnd(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.updateBtnsStatus();
    }
  }

  setSliderWidths(): void {
    this.sliderContainerWidth = this.sliderContainer.nativeElement.offsetWidth;
    this.minTranslateX = -(this.sliderItems.length * (this.defaultSlideWidth + this.gap) - this.sliderContainerWidth - this.gap);
    this.updateBtnsStatus();
  }

  prevSlide(): void {
    if (this.translateX >= this.minTranslateX) {
      this.translateX += this.defaultSlideWidth + this.gap;
    }
    this.updateBtnsStatus();
  }

  nextSlide(): void {
    if (this.translateX <= this.maxTranslateX) {
      this.translateX -= this.defaultSlideWidth + this.gap;
    }
    this.updateBtnsStatus();
  }

  navigateTo(id: number) {
    this.router.navigate([this.link + '/' + id]);
  }

  updateBtnsStatus() {
    if (this.translateX < this.minTranslateX) this.translateX = this.minTranslateX;
    if (this.translateX > this.maxTranslateX) this.translateX = this.maxTranslateX;

    this.prevIsDisabled = this.translateX === this.maxTranslateX;
    this.nextIsDisabled =  this.translateX === this.minTranslateX;

    this.isShowButton = this.sliderItems.length * (this.defaultSlideWidth + this.gap) - this.gap > this.sliderContainerWidth;
    this.cdr.detectChanges();
  }
}
