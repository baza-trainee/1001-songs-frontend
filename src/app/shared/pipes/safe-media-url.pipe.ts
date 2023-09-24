import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeMediaUrl',
  standalone: true
})
export class SafeMediaUrlPipe implements PipeTransform {
  constructor() {}

  transform(url: string): string {
    const service = 'https://www.youtube.com/embed/';
    const delimeter = /[/?]/;
    if (url) {
      const mediaSrcId = url.split(delimeter)[3];
      const newUrlSrc = `${service}${mediaSrcId}?rel=0&autohide=I`;
      return newUrlSrc;
    }
    return service;
  }
}
