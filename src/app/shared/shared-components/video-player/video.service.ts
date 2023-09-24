import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() {}

  getEmbeddedUrl(url: string): string {
    console.log(url)
    const service = 'https://www.youtube.com/embed/';
    const delimeter = /[/?]/;
    if (url) {
      const mediaSrcId = url.split(delimeter)[3];
      const newUrlSrc = `${service}${mediaSrcId}?rel=0&autohide=I`;
      return newUrlSrc;
    }
    return service;
  }

  previewFromUrl(url: string): string {
    const service = 'http://img.youtube.com/vi/';
    if (url) {
      const delimeter = /[/?]/;
      const mediaSrcId = url.split(delimeter)[3];
      const previewUrl = `${service}${mediaSrcId}/0.jpg`;
      return previewUrl;
    }
    return '';
  }

}
