import { Directive, ElementRef, HostBinding, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSlideString]',
  standalone: true
})
export class SlideStringDirective {
  private renderer = inject(Renderer2);
  private elRef = inject(ElementRef);
  private translateX = 0;
  private move = 0;

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    const touchX = event.touches[0].clientX;
    this.move = this.translateX + touchX;

    console.log(this.move);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {}

  @HostBinding('style.transform')
  get translate() {
    return `translateX(${this.move}px)`;
  }

  @HostListener('touchend') onTouchEnd() {}
}
