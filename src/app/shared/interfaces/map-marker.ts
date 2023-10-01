export interface Marker {
  key: string;
  position: { lat: number; lng: number };
  popup: {
    title: string;
    photoUrl: string;
    countRecords: number;
    link: string;
  };
}
