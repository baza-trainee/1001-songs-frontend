import { Marker } from "./interfaces/map-marker";

export const cordsMarkers: Marker[] = [
    {
      key: 'marker1',
      position: {lat: 50.4501, lng: 30.5234},
      popup: {
        title: 'с. Крячківка, Полтавська обл.',
        photoUrl: './assets/img/home/kiivImg.jpg',
        countRecords: 20,
        link: '#'
      }
    },
    {
      key: 'marker2',
      position: {lat: 49.8397, lng: 24.0297},
      popup: {
        title: 'м. Львів, Львівська обл.',
        photoUrl: './assets/img/home/kiivImg.jpg',
        countRecords: 16,
        link: '#'
      }
    },
    {
      key: 'marker3',
      position: {lat: 48.5132, lng: 32.2597},
      popup: {
        title: 'м. Кропівницький, Черкаська обл.',
        photoUrl: './assets/img/home/kiivImg.jpg',
        countRecords: 7,
        link: '#'
      }
    },
    {
      key: 'marker4',
      position: {lat: 46.4833, lng: 30.7326},
      popup: {
        title: 'м. Одеса, Одеська обл.',
        photoUrl: './assets/img/home/kiivImg.jpg',
        countRecords: 30,
        link: '#'
      }
    },
    {
      key: 'marker5',
      position: {lat: 48.6198, lng: 22.301},
      popup: {
        title: 'м. Ужгород, Закарпатська обл.',
        photoUrl: './assets/img/home/kiivImg.jpg',
        countRecords: 15,
        link: '#'
      }
    }
  ];