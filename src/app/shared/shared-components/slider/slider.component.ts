import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, fromEvent, Observable, Subscription } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('prev') prev!: ElementRef;
  @ViewChild('next') next!: ElementRef;
  @ViewChild('track') track!: ElementRef<HTMLDivElement>;
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;

  index: number = 0;
  gap: number = 24;
  defaultSlideWidth: number = 302;

  sliderWidth!: number;
  slideWidth!: number;

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  get prevIsDisabled() {
    return this.index === 0;
  }

  get nextIsDisabled() {
    return this.track?.nativeElement.offsetWidth - this.index * this.slideWidth <= this.sliderWidth;
  }

  get trackTransform() {
    return `translateX(-${this.index * (this.slideWidth || 0)}px)`;
  }

  setSliderWidths() {
    this.sliderWidth = this.sliderContainer.nativeElement.offsetWidth;
    this.slideWidth = (this.track.nativeElement.querySelector<HTMLDivElement>('.slide')?.offsetWidth || this.defaultSlideWidth) + this.gap;
  }

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

  imgSrc = 'https://drive.google.com/uc?export=view&id=1QpsMn5igy2b2ldRloUqVrpryy37v3d21';

  @Input() projectsItems = [
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина1',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина2',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина3',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина4',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина5',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина6',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина7',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина8',
      description: 'Короткий опис',
      location: 'Локація'
    },
    {
      img: this.imgSrc,
      date: 'Дата події',
      title: 'Новина9',
      description: 'Короткий опис',
      location: 'Локація'
    }
  ];

  constructor() {}
}
