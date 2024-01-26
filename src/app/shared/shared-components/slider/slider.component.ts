import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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
  @Input() routerLink: string = '/news';

  @ViewChild('track') set track(el: ElementRef<HTMLDivElement>) {
    this.trackRef = el.nativeElement;
    this.trackWidth = el.nativeElement.offsetWidth;
  }
  @ViewChild('sliderContainer') set sliderContainer(el: ElementRef<HTMLDivElement>) {
    this.sliderContainerRef = el.nativeElement;
    this.sliderWidth = el.nativeElement.offsetWidth;
  }
  @ViewChild('slide') set slide(el: ElementRef<HTMLDivElement> | undefined) {
    this.slideRef = el?.nativeElement || null;
    this.slideWidth = (el?.nativeElement.offsetWidth || 0) + this.gap;
  }

  constructor (private router: Router) {}

  sliderContainerRef: HTMLDivElement | null = null;
  trackRef: HTMLDivElement | null = null;
  slideRef: HTMLDivElement | null = null;

  sliderTitle!: string;

  index: number = 0;
  gap: number = 24;
  defaultSlideWidth: number = 302;
  translateX: number = 0;

  trackWidth = 0;
  sliderWidth = 0;
  slideWidth = 0;

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  prevIsDisabled: boolean = true;
  nextIsDisabled: boolean = false;

  setSliderWidths() {
    this.sliderWidth = this.sliderContainerRef?.offsetWidth || 0;
    this.slideWidth = (this.slideRef?.offsetWidth || this.defaultSlideWidth) + this.gap;
    this.trackWidth = this.trackRef?.offsetWidth || 0;
    this.defaultSlideWidth = 302;
  }

  prevSlide(): void {
    if (this.index > 0) this.index--;
    this.updateBtnsStatus()
  }

  nextSlide(): void {
    if (this.index < this.sliderItems.length - 1) this.index++;
    this.updateBtnsStatus()
  }

  updateBtnsStatus() {
    this.prevIsDisabled = this.index === 0;
    this.nextIsDisabled = this.isNextButtonDisabled();
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(debounceTime(300));
    this.setSliderWidths();

    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
      this.setSliderWidths();
      this.index = 0;
    });
  }

  getTranslateX() {
    this.translateX = this.index * (this.defaultSlideWidth + this.gap);
    this.updateBtnsStatus();
    if (this.translateX >= this.sliderItems.length * (this.defaultSlideWidth + this.gap) - this.sliderWidth - this.gap) {
      return -(this.sliderItems.length * (this.defaultSlideWidth + this.gap) - this.sliderWidth - this.gap);
    }
    return -this.translateX;
  }

  isNextButtonDisabled(): boolean {
    return (
      this.translateX >= this.sliderItems.length * (this.defaultSlideWidth + this.gap) - this.sliderWidth - this.gap || this.index === this.sliderItems.length - 1
    );
  }
}
