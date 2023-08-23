import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeMediaUrl',
  standalone: true
})
export class SafeMediaUrlPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  transform(url: string, ...args: unknown[]): unknown {
    const service = 'https://www.youtube.com/embed/';
    const delimeter = /[\/\?]/;
    if (url) {
      const mediaSrcId = url.split(delimeter)[3];
      console.log(mediaSrcId);
      const newUrlSrc = `${service}${mediaSrcId}?rel=0&autohide=I`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(newUrlSrc);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(service);
  }
}
