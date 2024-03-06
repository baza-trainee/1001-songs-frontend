export interface Order {
  id: number;
  type: 'stp-play' | 'stp-pause' | 'details-toggle' | 'yt-pause' | 'yt-playing' | 'stp-pause-all'|'';
}
