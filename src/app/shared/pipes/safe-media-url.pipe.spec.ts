import { DomSanitizer } from '@angular/platform-browser';
import { SafeMediaUrlPipe } from './safe-media-url.pipe';

describe('SafeMediaUrlPipe', () => {
  let sanitizer: DomSanitizer;
  it('create an instance', () => {
    const pipe = new SafeMediaUrlPipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
