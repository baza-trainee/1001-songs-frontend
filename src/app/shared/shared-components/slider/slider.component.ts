import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, fromEvent, Observable, Subscription } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';
import { Slide } from '../../interfaces/slide.interface';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() sliderItems!: Slide[];
  @Input() colorScheme: string = 'default';
  @Input() title!: string;

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

  sliderContainerRef: HTMLDivElement | null = null;
  trackRef: HTMLDivElement | null = null;
  slideRef: HTMLDivElement | null = null;

  sliderTitle!: string;

  index: number = 0;
  gap: number = 24;
  defaultSlideWidth: number = 302;

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
  }

  changeIndex(value: number) {
    this.index = value;
    this.updateBtnsStatus();
  }

  updateBtnsStatus() {
    this.prevIsDisabled = this.index === 0;
    this.nextIsDisabled = this.trackWidth - this.index * this.slideWidth <= this.sliderWidth;
  }

  ngOnInit() {
    this.resizeObservable$ = fromEvent(window, 'resize').pipe(debounceTime(300));

    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
      this.setSliderWidths();
      this.changeIndex(0);
    });
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }
}
