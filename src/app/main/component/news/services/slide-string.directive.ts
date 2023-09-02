import { Directive, ElementRef, HostBinding, HostListener, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FilterComponent } from '../components/filter/filter.component';

@Directive({
  selector: '[appSlideString]',
  standalone: true
})
export class SlideStringDirective implements AfterViewInit {
  private startX: number = 0;
  private currentX: number = 0;
  private translateX = 0;

  @ViewChild('slide', { read: FilterComponent })
  slide!: FilterComponent;

  ngAfterViewInit(): void {
    console.log(this.slide);
  }

  @HostBinding('style.transform') get translate() {
    return `translateX(${this.translateX})`;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    const maxScroll = 205;
    // const maxScroll = this.el.nativeElement.scrollWidth - this.el.nativeElement.offsetWidth + 70;
    const touch = event.touches[0];
    let diffX = touch.clientX - this.currentX;
    if (this.translateX > 0) {
      this.translateX = 0;
      console.log('more than zero');
    }
    this.translate;

    this.translateX += diffX;
    this.currentX = touch.clientX;
    if (maxScroll - Math.abs(this.translateX) <= 0) {
      console.log('less than zero');
    }
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.currentX = this.startX;
    console.log(event);
  }

  @HostListener('touchend') onTouchEnd() {
    console.log(this.translateX);
    this.startX = 0;
    this.currentX = 0;
  }

  run() {
    return this.translateX;
  }
}
