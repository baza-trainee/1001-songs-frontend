import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { StreamState } from '../../interfaces/stream-state.interface';
import { events } from '../../enums/audio.enum';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private stop$: Subject<void> = new Subject<void>();
  private audioObj?: HTMLAudioElement;

  private state: StreamState = {
    playing: false,
    muted: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false
  };

  constructor() {
    if (typeof Audio !== 'undefined') {
      this.audioObj = new Audio();
    } else {
      console.error('Audio is not supported in this environment.');
    }
  }

  showStereoPlayer$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private streamObservable(url: string) {
    if (!this.audioObj) return;
    return new Observable((observer) => {
      if (!this.audioObj) return;
      // Play audio
      this.audioObj.src = url;
      this.audioObj.load();
      //this.audioObj.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, Object.values(events), handler);
      return () => {
        if (!this.audioObj) return;
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, Object.values(events), handler);
        // reset state
        this.resetState();
      };
    });
  }

  setUpVolume(value: number) {

    if (value == 0) {
      this.state.muted = true;
    } else {
      this.state.muted = false;
    }


    this.audioObj.volume = value / 10;
  }

  playStream(url: string) {
    const stream = this.streamObservable(url);
    if(!stream) return
    return stream.pipe(takeUntil(this.stop$));
  }

  private addEvents(obj: HTMLAudioElement, events: string[], handler: (event: Event) => void) {
    events.forEach((event) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: HTMLAudioElement, events: string[], handler: (event: Event) => void) {
    events.forEach((event) => {
      obj.removeEventListener(event, handler);
    });
  }

  play() {
    if (!this.audioObj) return;
    this.audioObj.play();
  }

  pause() {
    if (!this.audioObj) return;
    this.audioObj.pause();
  }

  stop() {
    this.resetState();
    this.stateChange.next(this.state);
    this.stop$.next();
  }

  seekTo(seconds: number) {
    if (!this.audioObj) return;
    this.audioObj.currentTime = seconds;
  }

  formatTime(time: number, pattern: string = 'mm:ss') {
    const momentTime = time * 1000;
    return format(momentTime, pattern);
  }

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);

  private updateStateEvents(event: Event): void {
    if (!this.audioObj) return;
    switch (event.type) {
      case 'canplay':
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case 'playing':
        this.state.playing = true;
        break;
      case 'pause':
        this.state.playing = false;
        break;
      case 'timeupdate':
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      muted: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }
}
