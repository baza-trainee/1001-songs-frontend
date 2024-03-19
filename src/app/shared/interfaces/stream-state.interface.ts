export interface StreamState {
  playing: boolean;
  muted?: boolean;
  ended?: boolean;
  readableCurrentTime: string;
  readableDuration: string;
  duration: number | undefined;
  currentTime: number | undefined;
  canplay: boolean;
  error: boolean;
}
