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
    if (url) {
      const mediaSrcId = url.split('/').pop();
      const final = `${service}${mediaSrcId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(final);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(service);
  }
}
