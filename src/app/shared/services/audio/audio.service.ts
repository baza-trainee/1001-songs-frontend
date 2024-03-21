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
  private audioObj: HTMLAudioElement = new Audio();

  private state: StreamState = {
    playing: false,
    muted: false,
    ended: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false
  };

  showStereoPlayer$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private streamObservable(url: string) {
    return new Observable((observer) => {
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
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
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
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.resetState();
    this.stateChange.next(this.state);
    this.stop$.next();
  }

  seekTo(seconds: number) {
    this.audioObj.currentTime = seconds;
  }

  formatTime(time: number, pattern: string = 'mm:ss') {
    const momentTime = time * 1000;
    return format(momentTime, pattern);
  }

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);

  private updateStateEvents(event: Event): void {
    //console.log(event.type)
    if (this.state.ended) {
      this.state.ended = false;
      //console.log(event.type)
    }
    switch (event.type) {
      case 'canplay':
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case 'playing':
        this.state.playing = true;
        // this.state.ended = false;
        break;
      case 'pause':
        this.state.playing = false;
        break;
      case 'timeupdate':
        //  this.state.ended = false;
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
        break;
      case 'ended':
        this.state.ended = true;
        this.state.currentTime = 0;
        // console.log('ENDED');
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
      ended: false,
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
