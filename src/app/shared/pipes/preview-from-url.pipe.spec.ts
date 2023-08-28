import { PreviewFromUrlPipe } from './preview-from-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('PreviewFromUrlPipe', () => {
  let sanitizer: DomSanitizer;
  it('create an instance', () => {
    const pipe = new PreviewFromUrlPipe(sanitizer);
    expect(pipe).toBeTruthy();
  });

  it('https://youtu.be/T_vrh-QXLik become a http://img.youtube.com/vi/T_vrh-QXLik/0.jpg', () => {
    const url = 'https://youtu.be/T_vrh-QXLik';
    const pipe = new PreviewFromUrlPipe(sanitizer);
    const transformed = pipe.transform(url);
    expect(transformed).toBe('http://img.youtube.com/vi/T_vrh-QXLik/0.jpg');
  });
});
