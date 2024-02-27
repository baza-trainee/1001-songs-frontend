import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, Subject, takeUntil } from 'rxjs';
import { StreamState } from '../../interfaces/stream-state.interface';
import { events } from '../../enums/audio.enum';
import { format } from 'date-fns';
import { Store } from '@ngxs/store';
import { ResetSong } from 'src/app/store/player/player.actions';

@Injectable({
  providedIn: 'root'
})
export class MultiAudioService {
  constructor(private store: Store) {}
  private tracks: HTMLAudioElement[] = [];
  private audioStates: StreamState[] = [];
  private stop$: Subject<void> = new Subject<void>();

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

  private resetState() {
    this.audioStates = [...this.audioStates.map(() => this.createAudioState())];
  }

  private addAudio(url: string): HTMLAudioElement {
    const audioObj = this.createAudioObject(url);
    this.tracks.push(audioObj);
    this.audioStates.push(this.createAudioState());
    return audioObj;
  }

  private removeAudio(index: number): void {
    if (index >= 0 && index < this.tracks.length) {
      const audioObj = this.tracks[index];
      audioObj.pause();
      this.tracks.splice(index, 1);
      this.audioStates.splice(index, 1);
    }
  }

  private updateAudioState(index: number, event: Event): void {
    const state = this.audioStates[index];
    const audioObj = this.tracks[index];

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
        this.store.dispatch(new ResetSong());
        this.resetState();
        state.error = true;
        break;
    }

    this.multichannelStateSubject.next(this.audioStates);
  }

  setUpVolume(volumeValue: number){
    this.tracks.forEach(audio => audio.volume = volumeValue/10)
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
      const index = this.tracks.indexOf(audioObj);

      const streamObservable = new Observable<StreamState>((observer) => {
        const handler = (event: Event) => {
          this.updateAudioState(index, event);
          observer.next(this.audioStates[index]);
        };

        this.addEvents(audioObj, Object.values(events), handler);

        audioObj.play().catch((error) => {
          observer.error(error);
        });

        return () => {
          this.removeAudio(index);
          this.removeEvents(audioObj, Object.values(events), handler);
        };
      });

      observables.push(streamObservable);
    }

    return forkJoin(observables).pipe(map(() => this.audioStates));
  }

  play(): void {
    for (const audioObj of this.tracks) {
      audioObj.play();
    }
  }

  pause(): void {
    for (const audioObj of this.tracks) {
      audioObj.pause();
    }
  }

  stopAll(): void {
    this.tracks.forEach((audioObj) => {
      audioObj.pause();
    });
    this.tracks = [];
    this.audioStates = [];
    this.stop$.next();
  }

  mute(index: number): void {
    if (index >= 0 && index < this.tracks.length) {
      this.tracks[index].muted = true;
      this.audioStates[index].muted = true;
    }
  }

  unmute(index: number): void {
    if (index >= 0 && index < this.tracks.length) {
      this.tracks[index].muted = false;
      this.audioStates[index].muted = false;
    }
  }

  toggleMute(index: number): void {
    if (index >= 0 && index < this.tracks.length) {
      const audioObj = this.tracks[index];
      const state = this.audioStates[index];

      audioObj.muted = !audioObj.muted;
      state.muted = audioObj.muted;
    }
  }

  seekTo(seconds: number): void {
    for (const audioObj of this.tracks) {
      audioObj.currentTime = seconds;
    }
  }

  formatTime(time: number, pattern: string = 'mm:ss'): string {
    const momentTime = time * 1000;
    return format(momentTime, pattern);
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
