import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'previewFromUrl',
  standalone: true
})
export class PreviewFromUrlPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}
  transform(url: string, ...args: unknown[]): unknown {
    const service = 'http://img.youtube.com/vi/';
    if (url) {
      const mediaSrcId = url.split('/').pop();
      const previewUrl = `${service}${mediaSrcId}/0.jpg`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(service);
  }
}
