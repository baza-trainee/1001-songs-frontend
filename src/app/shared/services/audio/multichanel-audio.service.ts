import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, Subject, takeUntil } from 'rxjs';
import * as moment from 'moment/moment';
//import { MultichannelStreamStateInterface } from '../../interfaces/multichannel-stream-state.interface';
import { CloudService } from './cloud.service';
import { StreamState } from '../../interfaces/stream-state.interface';

@Injectable({
  providedIn: 'root'
})
export class MultichanelAudioService {
  constructor() {}
  private audioObjects: HTMLAudioElement[] = [];
  private audioStates: StreamState[] = [];
  private stop$: Subject<void> = new Subject<void>();
  private audioEvents: string[] = ['ended', 'error', 'play', 'playing', 'pause', 'timeupdate', 'canplay', 'loadedmetadata', 'loadstart'];

  private createAudioObject(url: string): HTMLAudioElement {
    const audioObj = new Audio();
    audioObj.src = url;
    audioObj.load();
    return audioObj;
  }

  private createAudioState(): StreamState {
    return {
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

  //  showMultichanelPlayerSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private addAudio(url: string): HTMLAudioElement {
    const audioObj = this.createAudioObject(url);
    this.audioObjects.push(audioObj);
    this.audioStates.push(this.createAudioState());
    return audioObj;
  }

  private removeAudio(index: number): void {
    if (index >= 0 && index < this.audioObjects.length) {
      const audioObj = this.audioObjects[index];
      audioObj.pause();
      this.audioObjects.splice(index, 1);
      this.audioStates.splice(index, 1);
    }
  }

  private updateAudioState(index: number, event: Event): void {
    const state = this.audioStates[index];
    const audioObj = this.audioObjects[index];

    switch (event.type) {
      case 'canplay':
        state.duration = audioObj.duration;
        state.readableDuration = this.formatTime(state.duration);
        state.canplay = true;
        break;
      case 'playing':
        state.playing = true;
        break;
      case 'pause':
        state.playing = false;
        break;
      case 'timeupdate':
        state.currentTime = audioObj.currentTime;
        state.readableCurrentTime = this.formatTime(state.currentTime);
        break;
      case 'error':
        state.error = true;
        break;
    }

    this.multichannelStateSubject.next(this.audioStates);
  }

  playStreamAll(urls: string[]) {
    this.stopAll();
    return this.playStream(urls).pipe(takeUntil(this.stop$));
  }

  playStream(urls: string[]): Observable<StreamState[]> {
    this.stopAll();

    const observables: Observable<StreamState>[] = [];

    for (const url of urls) {
      const audioObj = this.addAudio(url);
      const index = this.audioObjects.indexOf(audioObj);

      const streamObservable = new Observable<StreamState>((observer) => {
        const handler = (event: Event) => {
          this.updateAudioState(index, event);
          observer.next(this.audioStates[index]);
        };

        this.addEvents(audioObj, this.audioEvents, handler);

        audioObj.play().catch((error) => {
         // console.log('Multichannel error');
          observer.error(error);
        });

        return () => {
          this.removeAudio(index);
          this.removeEvents(audioObj, this.audioEvents, handler);
        };
      });

      observables.push(streamObservable);
    }

    return forkJoin(observables).pipe(map(() => this.audioStates));
  }

  play(): void {
    for (const audioObj of this.audioObjects) {
      audioObj.play();
    }
  }

  pause(): void {
    for (const audioObj of this.audioObjects) {
      audioObj.pause();
    }
  }

  stopAll(): void {
    this.audioObjects.forEach((audioObj) => {
      audioObj.pause();
    });
    this.audioObjects = [];
    this.audioStates = [];
    this.stop$.next();
  }

  mute(index: number): void {
    if (index >= 0 && index < this.audioObjects.length) {
      this.audioObjects[index].muted = true;
      this.audioStates[index].muted = true;
    }
  }

  unmute(index: number): void {
    if (index >= 0 && index < this.audioObjects.length) {
      this.audioObjects[index].muted = false;
      this.audioStates[index].muted = false;
    }
  }

  toggleMute(index: number): void {
    if (index >= 0 && index < this.audioObjects.length) {
      const audioObj = this.audioObjects[index];
      const state = this.audioStates[index];

      audioObj.muted = !audioObj.muted;
      state.muted = audioObj.muted;
    }
  }

  seekTo(seconds: number): void {
    for (const audioObj of this.audioObjects) {
      audioObj.currentTime = seconds;
    }
  }

  formatTime(time: number, format: string = 'mm:ss'): string {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  getState(index: number): Observable<StreamState> {
    if (index >= 0 && index < this.audioStates.length) {
      return new BehaviorSubject(this.audioStates[index]).asObservable();
    }
    return new BehaviorSubject(this.createAudioState()).asObservable();
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

  private multichannelStateSubject: BehaviorSubject<StreamState[]> = new BehaviorSubject<StreamState[]>([]);

  getMultichannelState(): Observable<StreamState[]> {
    return this.multichannelStateSubject.asObservable();
  }
}
