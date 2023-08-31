import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { SafeMediaUrlPipe } from './safe-media-url.pipe';
import { TestBed } from '@angular/core/testing';

describe('SafeMediaUrlPipe', () => {
  TestBed.configureTestingModule({
    imports: [BrowserModule]
  });

  let sanitizer: DomSanitizer;

  it('string should be changed', () => {
    const url = 'https://youtu.be/T_vrh-QXLik';
    const domSanitizer = TestBed.get(DomSanitizer);
    const pipe = new SafeMediaUrlPipe(domSanitizer);
    const transformed = pipe.transform(url) as string;
    const previewUrl = transformed.toString().split(' ')[4];
    expect(previewUrl).toBe('https://www.youtube.com/embed/T_vrh-QXLik?rel=0&autohide=I');
  });

  it('create an instance', () => {
    const pipe = new SafeMediaUrlPipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
