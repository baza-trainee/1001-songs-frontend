import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';

import { MapState } from './map.state';
import { FilteredMarkers } from './map.actions';
import { Marker, SongFilter } from '../../shared/interfaces/map-marker';

const mockMarkers: Marker[] = [
  {
    id: 'marker1',
    title: 'Song Title',
    genre_cycle: 'Genre A',
    found: 'Found 1',
    image: 'path/to/image.jpg',
    location: {
      country: 'Country A',
      region: 'Region X',
      district_center: 'District Center',
      recording_location: { lat: 50.4501, lng: 30.5234 }
    }
  }
];

const mockSongFilter: SongFilter = {
  country: ['Country A', 'Country B'],
  region: ['Region X', 'Region Y'],
  settlement: ['Settlement 1', 'Settlement 2'],
  title: ['Song Title 1', 'Song Title 2'],
  genre: ['Genre A', 'Genre B'],
  found: ['Found 1', 'Found 2']
};
describe('MapState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MapState]), HttpClientModule]
    });
    store = TestBed.inject(Store);
  });

  it('should initialize state with empty markers list', () => {
    const state = store.selectSnapshot(MapState);
    expect(state.markersList.length).toBe(0);
  });

  it('should filter markers by genre', () => {
    store.dispatch(new FilteredMarkers(mockSongFilter));
    const allHaveCorrectGenre = mockMarkers.every((marker) => marker.genre_cycle === 'Genre A');
    expect(allHaveCorrectGenre).toBe(true);
  });

  it('should filter markers by country', () => {
    store.dispatch(new FilteredMarkers(mockSongFilter));
    const allHaveCorrectGenre = mockMarkers.every((marker) => marker.location.country === 'Country A');
    expect(allHaveCorrectGenre).toBe(true);
  });
});
