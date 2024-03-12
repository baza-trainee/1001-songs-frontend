import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor() {}

  getIdFromUrl(url: string): string {
    if (!url) return '';
    const fragmets1 = url.split('?');
    const fragmets2 = fragmets1[0].split('/');
    const id = fragmets2[fragmets2.length - 1];
    return id;
  }

  getEmbeddedUrl(url: string): string {
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
